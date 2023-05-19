import "./ListRestaurants.css";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { listRestaurants } from "../graphql/queries";
import { deleteRestaurant } from '../graphql/mutations'
import { useEffect, useState } from "react";

export default function ListRestaurants() {
    const [data, setData] = useState([]);

    const handleDelete = async (restaurant) => {
        try {
            const { data: restData } = await API.graphql(
                graphqlOperation(deleteRestaurant, { input: { id: restaurant.id } }))
            console.log(restData);
            setData((prevData) => prevData.filter((item) => item.id !== restaurant.id));
        }


        catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        const allRestaurants = async () => {
            try {
                const restaurants = await API.graphql(graphqlOperation(listRestaurants));
                const newData = restaurants.data.listRestaurants.items;
                setData(newData)

            } catch (e) {
                console.log("error");
            }
        };
        allRestaurants();

    }, [])

    console.log(data);
    return (
        <div>
            <Link to={"/create"}>
                <div className="success-button">Create new</div>
            </Link>
            <div className="columns">
                {
                    data ?
                        data.map((restaurant) => (

                            <div className="card" key={restaurant.id}>
                                <h2>{restaurant.name}</h2>
                                <p><small>{restaurant.city}</small></p>
                                <p>{restaurant.description}</p>

                                <div className="del"><button onClick={() => handleDelete(restaurant)}><b>x</b></button></div>
                            </div>

                        )) : <div>No restaurants presently...Click on the "Create" button above to enter one.</div>
                }
            </div>


        </div>
    );
};

