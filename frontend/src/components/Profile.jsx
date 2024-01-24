import { AccountCircle, AlternateEmail } from "@mui/icons-material";
import { TextField, Avatar, Button, Skeleton } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";

const formFieldsExternal = {
  first_name: null,
  middle_name: null,
  last_name: null,
  birthday: null,
  contact_no: null,
  gender: null,
  address: null,
  country: null,
  city: null,
  zip_code: null,
};

function Profile() {
  const { isUserLogin, profileId, accessToken } = useContext(MainContext);
  const [formField, setformField] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birthday: "",
    contact_no: "",
    gender: "",
    address: "",
    country: "",
    city: "",
    zip_code: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/auth/profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        const json = JSON.parse(data);
        setformField(json);
        if (!data.user) {
          return;
        }
        async function setFormFieldNew() {
          await setformField(...json);
        }
        // setformField(
        //   (formField.address = data.address),
        //   (formField.city = data.city),
        //   (formField.contact_no = data.contact_no),
        //   (formField.country = data.country),
        //   (formField.first_name = data.first_name),
        //   (formField.middle_name = data.middle_name),
        //   (formField.last_name = data.last_name),
        //   (formField.gender = data.gender),
        //   (formField.country = data.country),
        //   (formField.zip_code = data.zip_code),
        //   (formField.profile_pic = data.profile_pic)
        // );
        console.log({ data: formField });
      });
  }, [isUserLogin]);
  const InputValueFunction = (e) => {
    setformField((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/api/upload/file",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <>
      {isUserLogin ? (
        formField ? (
          <form>
            <div className="bg-gray-200 w-full  flex justify-center">
              <div className="bg-white sm:w-[90%] md:w-[80%] xl:w-[70%] h-fit px-10 pb-5 space-y-5 m-2">
                <div className="pt-5">
                  <h1 className="text-red-500 text-2xl">Personal Info</h1>
                  <h2 className="text-gray-400 text-sm">
                    Update your photo and personal details here
                  </h2>
                </div>
                <div className="lg:flex justify-between gap-2 ">
                  <TextField
                    id="first_name"
                    label="First Name"
                    variant="standard"
                    value={formField.first_name}
                    name={"first_name"}
                    onChange={InputValueFunction}
                    className="w-full"
                  />
                  <TextField
                    id="middle_name"
                    label="Middle Name"
                    name="middle_name"
                    onChange={InputValueFunction}
                    variant="standard"
                    value={formField.middle_name}
                    className="w-full"
                  />
                  <TextField
                    id="last_name"
                    className="w-full"
                    label="Last Name"
                    name="last_name"
                    onChange={InputValueFunction}
                    value={formField.last_name}
                    variant="standard"
                  />
                </div>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AlternateEmail
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id=""
                    label="Email"
                    fullWidth={true}
                    onChange={InputValueFunction}
                    variant="standard"
                  />
                </Box>
                <h3 className="text-gray-500">Profile Pic</h3>
                <div className="flex ">
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      formField.profile_pic
                        ? `${formField.profile_pic}`
                        : "https://images.unsplash.com/photo-1661983228625-f4619e57f66b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    }
                    sx={{ width: 56, height: 56, marginRight: 3 }}
                  />
                  <TextField
                    id="profile_pic"
                    variant="outlined"
                    fullWidth={true}
                    type="file"
                    name="profile_pic"
                    onChange={InputValueFunction}
                    value={formField.profile_pic}
                    inputProps={{
                      multiple: true,
                    }}
                  />
                </div>
                <div className="pt-5">
                  <h1 className="text-red-500 text-2xl">Profile</h1>
                  <h2 className="text-gray-400 text-sm">
                    Update your Birthdate, Addressans other personal details
                    here
                  </h2>
                </div>
                <div className="lg:flex justify-between gap-2">
                  <TextField
                    id="birthday"
                    label="Birthdate"
                    className="w-full"
                    name="birthday"
                    value={formField.birthday}
                    variant="standard"
                    onChange={InputValueFunction}
                    type={"date"}
                    sx={{ minWidth: 180 }}
                  />
                  <TextField
                    id="contact_no"
                    variant="standard"
                    onChange={InputValueFunction}
                    name="contact_no"
                    label={"Mobile No"}
                    value={formField.contact_no}
                    className="w-full"
                    type={"number"}
                  />
                  <TextField
                    id="gender"
                    className="w-full"
                    onChange={InputValueFunction}
                    variant="standard"
                    label={"Mobile No"}
                    name="gender"
                  />
                </div>
                <div className="lg:flex justify-between gap-2">
                  <TextField
                    className="w-full"
                    id="country"
                    name="country"
                    onChange={InputValueFunction}
                    variant="standard"
                    label={"Country"}
                  />
                  <TextField
                    className="w-full"
                    id="city"
                    name="city"
                    onChange={InputValueFunction}
                    label="City"
                    variant="standard"
                  />
                  <TextField
                    className="w-full"
                    id="zip_code"
                    name="zip_code"
                    onChange={InputValueFunction}
                    variant="standard"
                    label={"Pin No."}
                    type={"number"}
                  />
                </div>
                <div>
                  <label className="text-gray-500 " htmlFor="address">
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    className="w-full p-2 border-2 focus:outline-red-500"
                    onChange={InputValueFunction}
                    rows="5"
                  />
                </div>

                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default Profile;
