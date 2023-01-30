import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CameraApp() {
  const [startCamera, setStartCamera] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [previewVisible, setPreviewVisible] = useState(true);
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

  async function takePicture() {
    // if the camera is undefined or null, we stop the function execution
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
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
          </View>
          {previewVisible ? (
            <View
              style={{
                backgroundColor: "transparent",
                flex: 4,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2022/09/20/19/13/mountains-7468597_960_720.jpg",
                }}
                style={{ width: 400, height: 400 }}
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
    justifyContent: "center",
    alignItems: "flex-start",
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
    margin: "auto",
  },
  previewRow: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttonStartCamera: {
    borderRadius: 4,
    backgroundColor: "#14274e",
    padding: 10,
  },
});
