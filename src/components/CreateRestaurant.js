import { useState } from "react"
import "./CreateRestaurant.css"
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { createRestaurant } from "../graphql/mutations";



export default function CreateRestaurant() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { fetchdata } = await API.graphql({
                query: createRestaurant,
                variables: {
                    input: { name, city, description }
                }
            });

            console.log(fetchdata);
            setName("");
            setDescription("");
            setCity("");
            navigate("/");

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h3>Create Restaurant</h3>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name of restaurant"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter city of restaurant"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div className="btn"> <button type="submit">Create</button></div>

            </form>

        </div>
    )
}
