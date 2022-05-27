import React, { useState } from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { motion } from "framer-motion";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
export const signIn = (credentials, showResultSuccess, showResultFailed) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.Email, credentials.Password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        showResultSuccess();
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
        showResultFailed();
      });
  };
};
function LoginPage(props) {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [User, setUser] = useState({
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandle = () => {
    setShowPassword(!showPassword);
  };
  const OnChange = (event) => {
    setUser({
      ...User,
      [event.target.id]: event.target.value,
    });
  };
  const OnSubmit = (event) => {
    event.preventDefault();
    props.signIn(User);
  };
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <div style={{ height: "140px" }}></div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card
                  className="card-login"
                  style={{ height: "450px", padding: "120px 10px 0px 10px" }}
                >
                  <Form
                    action=""
                    onSubmit={OnSubmit}
                    className="form"
                    method=""
                  >
                    <CardHeader className="text-center">
                      <div className="logo-container"></div>
                    </CardHeader>
                    <CardBody>
                      <motion.div
                        className="AnimateEmail"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (firstFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email..."
                            id="Email"
                            className="AnimateEmail"
                            type="email"
                            onChange={OnChange}
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                          />
                        </InputGroup>
                      </motion.div>
                      <motion.div
                        className="AnimatePassword"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ margin: 0 }}
                      >
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (lastFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons text_caps-small"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="Password"
                            className="AnimatePassword"
                            placeholder="Password..."
                            type={showPassword ? "text" : "password"}
                            onChange={OnChange}
                            onFocus={() => setLastFocus(true)}
                            onBlur={() => setLastFocus(false)}
                          />
                        </InputGroup>
                      </motion.div>
                    </CardBody>
                    <CardFooter className="text-center">
                      <motion.div
                        className="AnimateLoginButton"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          block
                          className="btn-round AnimateLoginButton"
                          color="info"
                          type="submit"
                          size="lg"
                          style={{
                            width: "70%",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          Login
                        </Button>
                      </motion.div>
                      <div className="pull-left">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Need Help?
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                  </Form>
                </Card>
              </motion.div>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}
const showResultSuccess = () => {
  window.alert("Login Sukses!");
};

const showResultFailed = () => {
  window.alert("Login Gagal Silakan Periksa Kembali Email dan Password Anda!");
};
const mapStateToProps = (state) => {
  console.log(state.firebase.auth);
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) =>
      dispatch(signIn(creds, showResultSuccess, showResultFailed)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
