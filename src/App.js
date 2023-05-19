import { Amplify } from "aws-amplify";
import "./App.css";
import { Authenticator, Image, View, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import yelpImage from './images/yelp.png'
import awsExports from "./aws-exports";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListRestaurants from "./components/ListRestaurants";
import CreateRestaurant from "./components/CreateRestaurant";
Amplify.configure(awsExports);

export default function App() {

  const myComponent = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="yelp logo"
            src={yelpImage}
            width="300px"
          />
        </View>
      );
    }
  }

  return (
    <Authenticator components={myComponent} >
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