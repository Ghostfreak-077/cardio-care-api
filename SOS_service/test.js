// const LoginSignUp = () => {
//     const dispatch = useDispatch();
//     const alert = useAlert();
//     const apiKey = "qrqbboKo4R45VtjqFhGNPilEZtnNXCf0IG9CzCazSwnctKXnVKJQ6NetnIKf";
//     const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
  
//     const { error, loading, isAuthenticated } = useSelector(
//       (state) => state.user
//     );
  
//     const navigate = useNavigate();
  
//     const loginTab = useRef(null);
//     const registerTab = useRef(null);
//     const switcherTab = useRef(null);
  
//     const [loginPhone, setLoginPhone] = useState("");
//     const [loginPassword, setLoginPassword] = useState("");
  
//     const [user, setUser] = useState({
//       name: "",
//       phone: "",
//       password: "",
//     });
  
//     const { name, phone } = user;
  
//     const registerSubmit = async (e) => {
//       e.preventDefault();
  
//       try {
//         const randomOTP = Math.floor(100000 + Math.random() * 900000);
//         // console.log(randomOTP);
       
//         const myForm = new FormData();
  
//         myForm.set("name", name);
//         myForm.set("phone", phone);
//         myForm.set("password", randomOTP);
//         dispatch(register(myForm)).catch((error) => {
//           alert.error("Error creating account. Please try again.");
//         });
  
//          const response = await axios.get(
//           ${apiUrl}?authorization=${apiKey}&route=otp&variables_values=${randomOTP}&flash=0&numbers=${phone}
//         );
//         console.log(response.data);
  
//         navigate("/login/verify");
//       } catch (error) {
//         alert.error("OTP sending failed. Please try again.");
//       }
//     };