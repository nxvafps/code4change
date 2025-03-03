import styled from "styled-components";

const StyledButton = styled.button`
background-color: #24292e;
color: white;
font-size: 16rem;
border-radius: 0.375rem;
cursor: pointer;
  &:hover {
    background-color: #1b1f23;
  }

`


 function LoginButton(){
    const handleLogin = () => {
       
      };

    return (
        <StyledButton onClick={handleLogin}>Login</StyledButton>
    )


}

function RegisterButton(){

    const handleRegister = () => {
       
    };
    return (
        <StyledButton onClick={handleRegister}>Register</StyledButton>
    )

    
}


export {LoginButton, RegisterButton}



`