import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type Plant = {
  id: number;
  name: string;
  condition: string;
  yield: string;
  image: string | null;
};

export default function IndexScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantName, setPlantName] = useState("");
  const [condition, setCondition] = useState("");
  const [yieldValue, setYieldValue] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (fromCamera: boolean) => {
    let result: ImagePicker.ImagePickerResult;

    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addPlant = () => {
    if (!plantName || !condition || !yieldValue) {
      alert("Please fill all fields!");
      return;
    }

    const newPlant: Plant = {
      id: plants.length + 1,
      name: plantName,
      condition,
      yield: yieldValue,
      image,
    };

    setPlants([...plants, newPlant]);
    setPlantName("");
    setCondition("");
    setYieldValue("");
    setImage(null);
  };

  const removePlant = (id: number) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Your Plant</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Condition (e.g., Healthy / Non-healthy)"
        value={condition}
        onChangeText={setCondition}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Yield (e.g., Good/Bad)"
        value={yieldValue}
        onChangeText={setYieldValue}
      />

      <View style={styles.imageButtonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={() => pickImage(false)}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={() => pickImage(true)}>
          <Text style={styles.buttonText}>Capture Photo</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.addPlantButton} onPress={addPlant}>
        <Text style={styles.buttonText}>Add Plant</Text>
      </TouchableOpacity>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.plantContainer}>
            <Text style={styles.plantName}>{item.name}</Text>
            <Text style={styles.detailsText}>Condition: {item.condition}</Text>
            <Text style={styles.detailsText}>Yield: {item.yield}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.previewImage} />}
            
            {/* ✅ Remove Button (Green) */}
            <TouchableOpacity style={styles.removeButton} onPress={() => removePlant(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
  },
  header: {
    backgroundColor: "green",
    padding: 5,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  imageButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  imageButton: {
    backgroundColor: "#008CBA",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  addPlantButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "green", // ✅ Changed to green
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white", // ✅ White text for contrast
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  plantContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 10,
  },
  plantName: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 5,
  },
});
