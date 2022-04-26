// CreateSlider
import { Container, Col } from "react-bootstrap";

import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyInputField } from "./MyField.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

const ContactSchema = Yup.object().shape({
  title: Yup.string().required("Title Is Required"),
});

function FormContact() {
  const user = useSelector((state) => state.user.data);
  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    console.log("lej", selectedFile);
  };

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            title_english: "",
            title_arabic: "",
            sub_title_english: "",
            sub_title_arabic: "",
            description_english: "",
            description_arabic: "",
            group: "",
            active: 1,
          }}
          validationSchema={ContactSchema}
          onSubmit={(values) => {
            console.log("Start");
            console.log(values, selectedFile);
            // Create an object of formData
            const formDataa = new FormData();
            // Update the formData object
            formDataa.append("title[en]", values.title_english);
            formDataa.append("title[ar]", values.title_arabic);
            formDataa.append("sub_title[en]", values.sub_title_english);
            formDataa.append("sub_title[ar]", values.sub_title_arabic);
            formDataa.append("description[en]", values.description_english);
            formDataa.append("description[ar]", values.description_arabic);
            formDataa.append("group", values.title_english);
            formDataa.append("photo", selectedFile);
            formDataa.append("active", 1);

            const options = {
              method: "post",
              url: `${process.env.REACT_APP_API_BASEURL}/api/admin/sliders`,
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user.token}`,
              },
              data: formDataa,
            };

            axios(options)
              .then(function (response) {
                console.log("response", response);
              })
              .catch(function (err) {
                console.log(err);
              });
          }}
        >
          {(formik) => (
            <Form>
              <div className="row g-3">
                <div className="col-md-12">
                  <MyInputField
                    name="title_english"
                    type="text"
                    placeholder="Title English"
                  />
                </div>

                <div className="col-md-12">
                  <MyInputField
                    name="title_arabic"
                    type="text"
                    placeholder="Title Arabic"
                  />
                </div>

                <div className="col-md-12">
                  <MyInputField
                    name="sub_title_english"
                    type="text"
                    placeholder="Sub Title English"
                  />
                </div>

                <div className="col-md-12">
                  <MyInputField
                    name="sub_title_arabic"
                    type="text"
                    placeholder="Sub Title Arabic"
                  />
                </div>

                <div className="col-md-12">
                  <MyInputField
                    name="description_english"
                    type="text"
                    placeholder="Description English"
                  />
                </div>


                <div className="col-md-12">
                  <MyInputField
                    name="description_arabic"
                    type="text"
                    placeholder="Description Arabic"
                  />
                </div>



                <div className="col-md-12">
                  <MyInputField
                    name="img"
                    type="file"
                    placeholder="Img"
                    onChange={(event) => onFileChange(event)}
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      width: "100%",
                      minHeight: "30px",
                      borderRadius: 35,
                      backgroundColor: "black",
                      padding: "10px ",
                      fontSize: "18px",
                      width: "100%",
                      minHeight: "30px",
                      color: "white",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
}

export default FormContact;
