// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from 'jwt-decode';
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { Alert, Card, Divider } from "@mui/material";
// import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";
// import { BASE_URL } from "../../utils/constants";

// // Define allowed branch_code values
// // Add more as needed

// export default function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (username === "") {
//       setErrorMessage("Please provide a username");
//       return;
//     }

//     if (password === "") {
//       setErrorMessage("Please provide a password");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(`${BASE_URL}/api/login`, {
//         username,
//         password,
//       });
//       const token = response.data.accessToken;
//       localStorage.setItem("token", token);
//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken);
//       const allowedBranchCodes = ['000','112','473']; 
     
//       if (!allowedBranchCodes.includes(decodedToken.user.branch_code)) {
//         let message = "Your Branch not allowed to login to this system";
//         setErrorMessage(message);
//         return;
//       }

//       navigate("/dashboards/dashboard1");
//     } catch (error) {
//       let message = error.response?.data?.message || "System Connection Problem, please try again";
//       setErrorMessage(message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: "50px"
//     }}>
//       <Typography variant="h2" sx={{fontWeight: '600', fontFamily: 'sans-serif'}}>
//         Employee Tax Record System
//       </Typography>
//       <Card sx={{border: "1px solid #ccc", backgroundColor: "#f8f8f8"}}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "Center" }}>
//             <LogoIcon/>
//           </Box>
//           <Divider sx={{ my: 2 }} />
//           <Typography component="h1" variant="h2" sx={{fontFamily: "sans-serif", fontWeight: '600', fontSize: '15px'}}>
//             Use ERP username and password for login
//           </Typography>
//           <Divider sx={{ my: 2 }} />

//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//               disabled={isLoading}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               autoComplete="current-password"
//               disabled={isLoading}
//             />
//             <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
//               {isLoading ? "Signing In..." : "Sign In"}
//             </Button>
//             <Divider sx={{ my: 2 }} />

//             {errorMessage !== "" ? (
//               <div className="error">
//                 <Alert severity="error">{errorMessage}</Alert>
//               </div>
//             ) : null}

//           </Box>

//         </Box>
//       </Card>
//       <Divider sx={{ my: 2 }} />
//       <Typography
//         variant="body2"
//         sx={{ fontWeight: "600", fontFamily: "sans-serif", textAlign: "center" }}
//       >
//         For support, call: +251972234068
//       </Typography>
//     </Container>

//   );
// }







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode"; 
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { Alert, Card, Divider } from "@mui/material";
// import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";
// import { BASE_URL } from "../../utils/constants";

// export default function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (username === "") {
//       setErrorMessage("Please provide a username");
//       return;
//     }
//     if (password === "") {
//       setErrorMessage("Please provide a password");
//       return;
//     }
//     try {
//       setIsLoading(true);
//       const response = await axios.post(`${BASE_URL}/api/login`, {
//         username,
//         password,
//       });
//       const token = response.data.accessToken;
//       localStorage.setItem("token", token);
//       const decodedToken = jwtDecode(token);
//       // const allowedBranchCodes = ['000', '112', '473'];

// const branches = [
//         { id: 565, name: "6 Kilo Branch", fc_code: "195" },
//         { id: 899, name: "Abay Sadiik jaefar Mosque Branch", fc_code: "27" },
//         { id: 652, name: "Abay Sadiiq Kolfe Branch", fc_code: "015" },
//         { id: 298, name: "Addey Abeba Stadium Branch", fc_code: "169" },
//         // ... rest of the branches
//       ];
//       // Function that returns an array of ids
//       const allowedBranchCodes = () => {
//         return branches.map(branch => branch.id);
//       };  

//       if (!allowedBranchCodes.includes(decodedToken.user.branch_code)) {
//         let message = "Your branch is not allowed to login to this system";
//         setErrorMessage(message);
//         return;
//       }

//       navigate("/dashboards/dashboard1");
//     } catch (error) {
//       let message = error.response?.data?.message || "System connection problem, please try again";
//       setErrorMessage(message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: "50px"
//     }}>
//       <Typography variant="h2" sx={{ fontWeight: '600', fontFamily: 'sans-serif' }}>
//         Employee Tax Record System
//       </Typography>
//       <Card sx={{ border: "1px solid #ccc", backgroundColor: "#f8f8f8" }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <LogoIcon />
//           </Box>
//           <Divider sx={{ my: 2 }} />
//           <Typography component="h1" variant="h2" sx={{ fontFamily: "sans-serif", fontWeight: '600', fontSize: '15px' }}>
//             Use ERP username and password for login
//           </Typography>
//           <Divider sx={{ my: 2 }} />

//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//               disabled={isLoading}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               autoComplete="current-password"
//               disabled={isLoading}
//             />
//             <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
//               {isLoading ? "Signing In..." : "Sign In"}
//             </Button>
//             <Divider sx={{ my: 2 }} />

//             {errorMessage && (
//               <Alert severity="error">{errorMessage}</Alert>
//             )}
//           </Box>
//         </Box>
//       </Card>
//       <Divider sx={{ my: 2 }} />
//       <Typography
//         variant="body2"
//         sx={{ fontWeight: "600", fontFamily: "sans-serif", textAlign: "center" }}
//       >
//         For support, call: +251972234068
//       </Typography>
//     </Container>
//   );
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode } from "jwt-decode"; // Correct import without braces
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Card, Divider } from "@mui/material";
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";
import { BASE_URL } from "../../utils/constants";
import { Addis_Branch_List} from "../../services/erpBranchapi";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setErrorMessage("Please provide a username");
      return;
    }
    if (password === "") {
      setErrorMessage("Please provide a password");
      return;
    }
    try {
      setIsLoading(true);
      const branch_list= await Addis_Branch_List();
      const response = await axios.post(`${BASE_URL}/api/login`, {
        username,
        password,
      });
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
    console.log(decodedToken)
      const allowedBranchCodes = branch_list.map(branch => branch.fc_code);
      allowedBranchCodes.push('000');
      if (!allowedBranchCodes.includes(decodedToken.user.branch_code)) {
        let message = "Your branch is not allowed to login to this system";
        setErrorMessage(message);
        return;
      }
console.log(allowedBranchCodes)
      navigate("/dashboards/dashboard1");
    } catch (error) {
      let message = error.response?.data?.message || "System connection problem, please try again";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs" sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "50px"
    }}>
      <Typography variant="h2" sx={{ fontWeight: '600', fontFamily: 'sans-serif' }}>
        Employee Tax Record System
      </Typography>
      <Card sx={{ border: "1px solid #ccc", backgroundColor: "#f8f8f8" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LogoIcon />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography component="h1" variant="h2" sx={{ fontFamily: "sans-serif", fontWeight: '600', fontSize: '15px' }}>
            Use ERP username and password for login
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
            <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Divider sx={{ my: 2 }} />

            {errorMessage && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
          </Box>
        </Box>
      </Card>
      <Divider sx={{ my: 2 }} />
      {/* <Typography
        variant="body2"
        sx={{ fontWeight: "600", fontFamily: "sans-serif", textAlign: "center" }}
      >
        For support, call: +251972234068
      </Typography> */}
    </Container>
  );
}








