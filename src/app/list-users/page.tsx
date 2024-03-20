'use client'
import React from "react";
import {Container,Inset,Table,TableBody,TableHeader,TableRow,TableCell,} from "@radix-ui/themes";
import useAxios from "axios-hooks";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default function Home() {
  const [{ data, loading, error }] = useAxios("https://reqres.in/api/users");
console.log('data',data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const userData: UserData[] = data.data; 

  return (
    <main>
      <Container size="1">
        <Inset side="x" my="5">
          <Table.Root>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((user: UserData) => ( 
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table.Root>
        </Inset>
      </Container>
    </main>
  );
};


