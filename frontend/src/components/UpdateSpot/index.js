import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom/cjs/react-router-dom.min";
import {getOneSpotThunk, updateSpotThunk} from "../../store/spotsReducer";

const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "AS",
  "GU",
  "MP",
  "PR",
  "VI",
];

const fixedPrice = (price) => (+price).toFixed(2);

const lettersOnly = (word) => {
  return /^[A-Za-z\s]*$/.test(word);
};

export default function UpdateSpot() {
  const {spotId} = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spots[spotId]);
  console.log("spot to edit", spot);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then((spot) => {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
    });
  }, [dispatch, spotId]);

  useEffect(() => {
    const errorsObj = {};

    if (!country) errorsObj.country = "Country is required";
    if (!address) errorsObj.address = "Address is required";
    if (!city) errorsObj.city = "City is required";
    if (!state) errorsObj.state = "State is required";
    if (!name) errorsObj.name = "Name is required";
    if (!price) errorsObj.price = "Price is required";

    if (isNaN(price)) errorsObj.price = "Please input a number value";

    if (!lettersOnly(country))
      errorsObj.country = "Please input a valid country";

    if (!usStates.includes(state.toUpperCase()))
      errorsObj.state =
        "Please enter a capitalized valid US State (i.e CA or HI)";

    if (description.length < 30)
      errorsObj.description = "Description needs a minimum of 30 characters";

    if (description.length > 4800)
      errorsObj.description = "Description must be less than 4800 characters";

    if (!usStates.includes(state.toUpperCase()))
      errorsObj.state =
        "Please enter a capitalized valid US State (i.e CA or HI)";
    if (name.length > 50)
      errorsObj.name = "Name must be less than 50 characters";

    setErrors(errorsObj);
  }, [country, address, city, state, name, price, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    if (Object.keys(errors).length > 0) {
      return alert("Please enter valid information to create your spot.");
    }

    setErrors({});

    const newPrice = fixedPrice(price);

    console.log("this is fixed price", newPrice);

    const updatedSpot = {
      id: spot.id,
      address,
      city,
      state: state.toUpperCase(),
      country,
      lat: 37.76,
      lng: -122.47,
      name,
      description,
      price: newPrice,
    };

    console.log("Updated Spot in COMP", updatedSpot);

    const spotUpdate = await dispatch(updateSpotThunk(updatedSpot));

    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setName("");
    setPrice("");

    if (spotUpdate) history.push(`/spots/${spotUpdate.id}`);
  };

  return (
    <div className="wrapper-div">
      <form className="spot-form" onSubmit={handleSubmit}>
        <div
          style={{
            border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <h3>Update your Spot</h3>
          <div>Where's your place located?</div>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <label>Country</label>
        {didSubmit && errors.country && <p>{errors.country}</p>}
        <input
          type="text"
          placeholder="United States of America"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Street Address</label>
        {didSubmit && errors.address && <p>{errors.address}</p>}
        <input
          type="text"
          placeholder="123 Main Street"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div style={{border: "1px solid red"}}>
          <label>City</label>
          {didSubmit && errors.city && <p>{errors.city}</p>}
          <input
            type="text"
            placeholder="San Francisco"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>State</label>
          {didSubmit && errors.state && <p>{errors.state}</p>}
          <input
            type="text"
            value={state}
            placeholder="CA"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="des-div" style={{border: "1px orange solid"}}>
          <h4>Describe your place to Guests</h4>
          <div>
            Mention the best features of your space, any special amentities like
            fast wifi or paking, and what you love about the neighborhood.
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          {didSubmit && errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <h4>Create a title for your spot</h4>
          <p>
            Catch guests' attention with a spot that highlights what makes your
            place special.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
          {didSubmit && errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <h4>Set a base price for your spot</h4>
          <p>
            Competitive pricing can help your list stand out and rank higher in
            search results
          </p>
          <span>$</span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
          />
          {didSubmit && errors.price && <p>{errors.price}</p>}
        </div>

        <button className="spot-button" type="submit">
          Update Your Spot
        </button>
      </form>
    </div>
  );
}
