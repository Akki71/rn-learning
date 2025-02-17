import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
const Register = () => {
  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [address, setAddress] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [referralCode, setReferralCode] = React.useState("");

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [courses, setCourses] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.4/nexus/student/apis/get_courses.php",
          { params: null }
        );
        if (response) {
          try {
            setCourses(response.data.data);
          } catch (error) {
            console.error("Error getting data:", error);
          }
        }
      } catch (error) {
        // Handle login error
        console.log(error);
      }
    };
    getCourses();
  }, []);
  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
    hideDatePicker();
  };
  const handleCourseSelection = (items) => {
    setSelectedCourses(items);
  };
  const validateForm = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required.";
    }
    if (!middleName) {
      errors.middleName = "Middle name is required.";
    }
    if (!lastName) {
      errors.lastName = "Last name is required.";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    }
    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required.";
    }
    if (!address) {
      errors.address = "Address is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async () => {
    const isFormValid = validateForm();
    console.log(isFormValid);
    if (0) {
      try {
        const formData = {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          address: address,
          mobileNumber: mobileNumber,
          referralCode: referralCode,
          selectedCourses: selectedCourses,
        };

        const response = await axios.post(
          "http://192.168.1.4/nexus/student/apis/register_student.php",
          formData
        );

        console.log("Form submitted", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Registration</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.description}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View
              style={[
                styles.inputFieldContainer,
                validationErrors.firstName
                  ? styles.inputFieldContainerError
                  : styles.inputFieldContainer,
              ]}
            >
              <Image
                style={styles.inputFieldIcon}
                source={require("../../assets/user-icon.png")}
              />
              <TextInput
                placeholder="First Name"
                style={styles.inputField}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
              {validationErrors.firstName && (
                <Text style={styles.errorText}>
                  {validationErrors.firstName}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.inputFieldContainer,
                validationErrors.middleName
                  ? styles.inputFieldContainerError
                  : styles.inputFieldContainer,
              ]}
            >
              <Image
                style={styles.inputFieldIcon}
                source={require("../../assets/user-icon.png")}
              />
              <TextInput
                placeholder="Middle Name"
                style={styles.inputField}
                value={middleName}
                onChangeText={(text) => setMiddleName(text)}
              />
              {validationErrors.middleName && (
                <Text style={styles.errorText}>
                  {validationErrors.middleName}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.inputFieldContainer,
                validationErrors.lastName
                  ? styles.inputFieldContainerError
                  : styles.inputFieldContainer,
              ]}
            >
              <Image
                style={styles.inputFieldIcon}
                source={require("../../assets/user-icon.png")}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.inputField}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
              {validationErrors.lastName && (
                <Text style={styles.errorText}>
                  {validationErrors.lastName}
                </Text>
              )}
            </View>

            <View style={[styles.inputFieldContainer]}>
              <Image
                style={styles.inputFieldIcon}
                source={require("../../assets/calendar.png")}
              />
              <TouchableOpacity
                style={styles.inputField}
                onPress={showDatePicker}
              >
                <Text>{dateOfBirth.toDateString()}</Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date(1900, 0, 1)} // Optional minimum date
                  maximumDate={new Date()} // Optional maximum date
                />
              )}
            </View>

            <View
              style={[
                styles.inputFieldContainer,
                validationErrors.mobileNumber
                  ? styles.inputFieldContainerError
                  : styles.inputFieldContainer,
              ]}
            >
              <Image
                style={styles.inputFieldIcon}
                source={require("../../assets/mobile.png")}
              />
              <TextInput
                placeholder="Mobile Number"
                style={styles.inputField}
                keyboardType="numeric"
                value={mobileNumber}
                onChangeText={(text) => setMobileNumber(text)}
              />
              {validationErrors.mobileNumber && (
                <Text style={styles.errorText}>
                  {validationErrors.mobileNumber}
                </Text>
              )}
            </View>
            <View style={styles.inputFieldContainer}>
              <Image
                style={styles.inputFieldIcon}
                source={require("../../assets/network.png")}
              />
              <TextInput
                placeholder="Referral Code (optional)"
                style={styles.inputField}
                value={referralCode}
                onChangeText={(text) => setReferralCode(text)}
              />
            </View>

            <TextInput
              placeholder="Address"
              style={styles.textarea}
              multiline
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <View style={styles.dropdownContainer}>
              <MultiSelect
                items={courses}
                uniqueKey="id"
                onSelectedItemsChange={handleCourseSelection}
                selectedItems={selectedCourses}
                selectText="Select Courses"
                searchInputPlaceholderText="Search Courses..."
                altFontFamily="Arial"
                tagRemoveIconColor="#000"
                tagBorderColor="#000"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="grey"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#185DCF"
                submitButtonText="Submit"
                styleDropdownMenuSubsection={styles.dropdownMenuSubsection}
                styleTextDropdown={styles.dropdownText}
                styleDropdownMenu={styles.dropdownMenu}
                styleItemsContainer={styles.itemsContainer}
                styleListContainer={styles.listContainer}
                styleSelectorContainer={styles.selectorContainer}
                styleInputGroup={styles.inputGroup}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
  content: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
  },
  formContainer: {
    width: width * 0.8,
    alignItems: "center",
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderColor: "#969696",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputFieldContainerError: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputFieldIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
  },
  dropdownContainer: {
    width: "100%",
    marginVertical: 15,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "black",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  dropdownSelected: {
    backgroundColor: "#E3F2FD",
  },
  dropdownTickIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  dropdownOption: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  textarea: {
    width: "100%",
    height: 80,
    borderColor: "#969696",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#185DCF",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownMenuSubsection: {},
  dropdownText: {
    fontSize: 14,
    color: "#000",
    marginTop: 0,
  },
  dropdownMenu: {
    borderColor: "#969696",
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 0,
    maxHeight: 200,
  },
  itemsContainer: {
    maxHeight: 200,
  },
  listContainer: {
    borderColor: "#969696",
    borderWidth: 1,
  },
  selectorContainer: {
    marginTop: 0,
  },
  inputGroup: {
    borderColor: "#969696",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default Register;
