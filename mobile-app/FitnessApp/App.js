
import { View, Text, StyleSheet} from "react-native";
import _ from 'lodash';
import { useState } from 'react';
import { useAssets } from "expo-asset";
import * as FileSystem from 'expo-file-system';

import {
  loadTensorflowModel
} from 'react-native-fast-tflite'


import InputWithLabel from "./components/InputWithLabel";
import TagLine from "./components/TagLine";
import ButtonRound from "./components/ButtonRound";
import MyLightTokenizer from './services/tokenizer'


export default function App() {
  const [text, setText] = useState();
  const [model, setModel] = useState(null);
  const [tokenizer, setTokenizer] = useState();
  const [tags, setTags] = useState([]);

  const [assets, error] = useAssets([require('./assets/tflite_mobile/model.tflite'), 
                                     require('./assets/tflite_mobile/vocab.txt')]);
  const config = require('./assets/tflite_mobile/config.json')

  const loadModel = async () => {
    try {
        const loadedModel = await loadTensorflowModel({url:assets[0].uri});
        setModel(loadedModel);
        let vocab = await FileSystem.readAsStringAsync(assets[1].localUri);
        let tokenizer = new MyLightTokenizer(vocab)
        setTokenizer(tokenizer)

      } catch (error) {
        console.error('Error model:', error);
      }
  }

  const process_text = async ()=>{
    const sentence = text;
    const tokens_info = tokenizer.tokenize(sentence);
    const paddedTokens = tokenizer.padTokens(tokens_info.tokenIds, 510);
    const inputIdsIDS = tokenizer.addSpecialTokens(paddedTokens)
    const inputIdsIDS_b64 = BigInt64Array.from(inputIdsIDS, x => BigInt(x));
    const inputAttentionMaskIDS = new BigInt64Array(512).fill(BigInt(1))

    try{
      const outputData =  model.runSync([inputAttentionMaskIDS, inputIdsIDS_b64])
      let proPos = _.chunk(outputData[0], 8)
      let indexs = []

      proPos.forEach(x => indexs.push(_.indexOf(x, _.max(x))))
      indexs = indexs.slice(1, tokens_info.tokens.length+1)
      const words = indexs.map(index => config.id2label[index]); 
      
      var tags = words.map((k, i)=>{ 
        return <TagLine tag={k} text={tokens_info.tokens[i]}></TagLine>
      })
      setTags(tags)
      
    }catch(e){
      console.error(e)
    }


  }
  
  return (
    <View style={styles.container}>

        <InputWithLabel title="Workout" placeholder="I want to do 20 jumps daily." onChangeText={setText} ></InputWithLabel>
        
        <Text> Tag List</Text>
        { // render tag list
          tags
        }

        
        <View style={styles.bottom}>
        {
          // RUN Inference 
          model ? (
            <ButtonRound label="RUN" onPress={process_text} theme="primary" icon="save" ></ButtonRound>
          ) : (
          // load TFLITE model 
            <ButtonRound label="LOAD MODEL" onPress={loadModel} theme="primary" icon="save" ></ButtonRound>
          )
        }
        </View>
    </View>
  );
}

// Style
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      marginTop: 100,
    },
    bottom:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10
    }
})
