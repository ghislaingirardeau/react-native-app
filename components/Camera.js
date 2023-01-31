import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
/* import * as FileSystem from "expo-file-system"; */

export default function CameraApp() {
  const [startCamera, setStartCamera] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  /*   async function downloadFile() {
    const fileUri = `${FileSystem.documentDirectory}test`;
    const downloadedFile = await FileSystem.downloadAsync(
      capturedImage.uri,
      fileUri
    );

    if (downloadedFile.status != 200) {
      console.log("error");
    }
  } */

  async function takePicture() {
    // if the camera is undefined or null, we stop the function execution
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
    setStartCamera(false);
  }

  let camera = Camera;

  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.btnPhotoContainer}>
            <TouchableOpacity
              style={styles.btnPhoto}
              onPress={toggleCameraType}
            >
              <Ionicons name="ios-arrow-undo-outline" size={40} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPhoto} onPress={takePicture}>
              <Ionicons name="scan-circle-outline" size={65} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPhoto}
              onPress={() => setStartCamera(false)}
            >
              <Ionicons name="stop-circle-outline" size={40} color="red" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <View style={styles.previewRow}>
            <TouchableOpacity
              style={styles.buttonStartCamera}
              onPress={() => setStartCamera(true)}
            >
              <Ionicons name="camera-outline" size={40} color="white" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.buttonStartCamera}
              onPress={downloadFile}
            >
              <Ionicons name="download-outline" size={40} color="white" />
            </TouchableOpacity> */}
          </View>
          {previewVisible ? (
            <View style={styles.previewImage}>
              <ImageBackground
                source={{
                  uri: capturedImage.uri,
                }}
                style={{
                  flex: 1,
                }}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  btnPhotoContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  btnPhoto: {
    flex: 1,
    alignSelf: "space-between",
    alignItems: "center",
    padding: 5,
  },
  previewContainer: {
    flex: 1,
  },
  previewRow: {
    flex: 2,
    alignSelf: "center",
    justifyContent: "center",
  },
  previewImage: {
    backgroundColor: "transparent",
    flex: 10,
  },
  buttonStartCamera: {
    borderRadius: 4,
    backgroundColor: "#14274e",
    padding: 10,
  },
});
