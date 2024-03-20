'use client'
import { Button, Container, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import useAxios from "axios-hooks";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [{ loading, error }, executePost] = useAxios(
    {
      url: "https://reqres.in/api/users",
      method: "POST",
    },
    { manual: true }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await executePost({
        data: formData,
      });
      console.log("Data saved successfully:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <main className="create">
      <Container size="1">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <div style={{ fontSize: "16px", marginBottom: "8px", fontWeight: "bold" }}>
                First Name
              </div>
              <TextField.Input
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            <label>
              <div style={{ fontSize: "16px", marginBottom: "8px", fontWeight: "bold" }}>
                Email
              </div>
              <TextField.Input
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <div style={{ fontSize: "16px", marginBottom: "8px", fontWeight: "bold" }}>
                Last Name
              </div>
              <TextField.Input
                name="lastName"
                placeholder="Enter your Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
          </Flex>
          <Button type="submit">Save</Button>
        </form>
      </Container>
    </main>
  );
}
