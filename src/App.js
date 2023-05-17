import { Amplify } from "aws-amplify";
import "./App.css";
import { Authenticator, Image, View, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import myImage from './images/yelp.png'
import awsExports from "./aws-exports";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListRestaurants from "./components/ListRestaurants";
import CreateRestaurant from "./components/CreateRestaurant";
Amplify.configure(awsExports);

export default function App() {

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="yelp logo"
            src={myImage}
            width="300px"
          />
        </View>
      );
    }
  }





  return (
    <Authenticator components={components} >
      {({ signOut, user }) => (
        <main>
          <div>
            <BrowserRouter>
              <NavBar logOut={signOut} />
              <div className="bg">
                <div className="image-div">

                </div>
              </div>

              <Routes>
                <Route exact path="/" element={<ListRestaurants />} />
                <Route path="/create" element={<CreateRestaurant />} />
              </Routes>
            </BrowserRouter>

          </div>
        </main>
      )}
    </Authenticator>
  );
}









// import './App.css';
// import { useEffect } from 'react';


// import { listRestaurants } from './graphql/queries';

// import { createRestaurant } from './graphql/mutations'
// import { onCreateRestaurant } from './graphql/subscriptions'

// import { API, Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

// function App() {
//   useEffect(() => {
//     const pullData = async () => {
//       const data = await API.graphql({ query: listRestaurants })
//       console.log(data);
//     }
//     pullData()

//     const subscription = API.graphql(
//       { query: onCreateRestaurant }
//     ).subscribe({
//       next: restaurantData => {
//         pullData()
//       },
//       error: (err) => {
//         console.log(err)
//       }
//     })

//     return () => subscription.unsubscribe()

//   }, [])

//   const createNewRestaurant = async () => {

//     const name = prompt("Enter the name of your Recipe")
//     const description = prompt("Enter the description of your Restaurant")
//     const city = prompt("Enter the city of your Recipe")


//     const newRestaurant = await API.graphql({
//       query: createRestaurant,
//       variables: { input: { name, description, city } }
//     })

//     return newRestaurant

//   }
//   return (
//     <div className="App">
//       <button onClick={createNewRestaurant}><b>CREATE RECIPE</b></button>
//     </div>
//   );
// }

// export default App;
