import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity ,Button} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
const OfflineLecture = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [areSubtitlesVisible, setAreSubtitlesVisible] = useState(false);
  const [volume, setVolume] = useState(1);

  //console.log(props.route.params);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };


    
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: props.route.params.joinLink }}
        style={[styles.video, isRotated && styles.rotatedVideo]}
        resizeMode="contain"
        paused={!isPlaying}
        repeat={true}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch="ignore"
        volume={volume}
        selectedAudioTrack={{
          type: "title",
          value: areSubtitlesVisible ? 1 : -1,
        }}
      />

      <View style={styles.overlay}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  video: {
    flex: 1,
  },
  rotatedVideo: {
    transform: [{ rotate: '90deg' }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
  },
  rotatedIcon: {
    transform: [{ rotate: '90deg' }],
  },
});

export default OfflineLecture;