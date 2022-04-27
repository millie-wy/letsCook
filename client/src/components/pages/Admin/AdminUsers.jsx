import {
  AddModerator,
  Delete,
  Refresh,
  RemoveModerator,
} from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAccount } from "../../context/AccountContext";
import { makeRequest } from "../../../helper";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const { currentUser } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  // for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userInFocus, setUserInFocus] = useState({});

  const [promoteOpen, setPromoteOpen] = React.useState(false);
  const handlePromoteOpen = () => setPromoteOpen(true);
  const handlePromoteClose = () => setPromoteOpen(false);

  const [demoteOpen, setDemoteOpen] = React.useState(false);
  const handleDemoteOpen = () => setDemoteOpen(true);
  const handleDemoteClose = () => setDemoteOpen(false);

  useEffect(() => {
    if (currentUser === undefined) {
      setIsLoading(true);
    } else if (currentUser.role === "admin") {
      const fetchUser = async () => {
        let result = await makeRequest(`/api/users`, "GET");
        setUsers(result);
        console.log(result);
        setIsLoading(false);
      };
      fetchUser();
    } else return;
  }, [currentUser]);

  const prepareUser = (id, firstName, lastName, assignment) => {
    setUserInFocus({ id, firstName, lastName });

    if (assignment === "removeUser") {
      handleOpen();
    } else if (assignment === "promoteUser") {
      handlePromoteOpen();
    } else if (assignment === "demoteUser") {
      handleDemoteOpen();
    }
  };

  const deleteUser = async (id, firstName, lastName) => {
    setIsUpdating(true);
    let response = await makeRequest(`/api/users/${id}`, "DELETE");
    setTimeout(() => {
      alert(`User: ${firstName} ${lastName} has been deleted`);

      setIsUpdating(false);
      handleClose();
      navigate("/admin");
    }, 1000);
  };

  const promoteUser = async (id, firstName, lastName) => {
    setIsUpdating(true);

    let adminObject = { isAdmin: true };
    let response = await makeRequest(`/api/users/${id}`, "PUT", adminObject);
    setTimeout(() => {
      alert(`User: ${firstName} ${lastName} has been promoted to admin`);

      setIsUpdating(false);
      handlePromoteClose();
      navigate("/admin");
    }, 1000);
  };

  const demoteUser = async (id, firstName, lastName) => {
    setIsUpdating(true);

    let adminObject = { isAdmin: false };
    let response = await makeRequest(`/api/users/${id}`, "PUT", adminObject);
    setTimeout(() => {
      alert(`User: ${firstName} ${lastName} has been demoted to admin`);

      setIsUpdating(false);
      handleDemoteClose();
      navigate("/admin");
    }, 1000);
  };

  return isLoading ? (
    <Container sx={{ height: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  ) : (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Poppins",
          lineHeight: 1.5,
          fontWeight: 600,
          mx: ".5rem",
        }}
      >
        Here you can change <span style={{ color: "#0B814A" }}>role</span> of,
        or <span style={{ color: "#FF5858" }}>delete</span> users.
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {users.map((user) => (
          <Container
            key={users.indexOf(user)}
            sx={{
              background: "white",
              borderRadius: 5,
              py: "1.5rem",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="W"
                src={user.profilePic}
                sx={{ bgcolor: "#B6D5D5", width: 70, height: 70 }}
              />

              <Box sx={{ p: "0 1rem" }}>
                <Typography variant="h6" sx={{ color: "#0B814A" }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  sx={{
                    color: "#0B814A",
                    fontSize: ".8rem",
                    fontWeight: "600",
                  }}
                >
                  Role: {user.isAdmin ? "admin" : "user"}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                w: 1,
                display: "flex",
                pt: "1rem",
                justifyContent: "space-between",
              }}
            >
              {" "}
              {user.isAdmin ? (
                <IconButton
                  aria-label="removeAdmin"
                  size="large"
                  onClick={() =>
                    prepareUser(
                      user._id,
                      user.firstName,
                      user.lastName,
                      "demoteUser"
                    )
                  }
                >
                  <RemoveModerator fontSize="large" sx={{ color: "#0B814A" }} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="promoteAdmin"
                  size="large"
                  onClick={() =>
                    prepareUser(
                      user._id,
                      user.firstName,
                      user.lastName,
                      "promoteUser"
                    )
                  }
                >
                  <AddModerator fontSize="large" sx={{ color: "#0B814A" }} />
                </IconButton>
              )}
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() =>
                  prepareUser(
                    user._id,
                    user.firstName,
                    user.lastName,
                    "removeUser"
                  )
                }
              >
                <Delete fontSize="large" sx={{ color: "#FF5858" }} />
              </IconButton>
            </Box>
          </Container>
        ))}
        {/* delete user modal */}
        {!isUpdating ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontFamily: "Poppins" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Delete {userInFocus.firstName} user?
                </Typography>

                <Button
                  sx={{
                    borderRadius: "1rem",
                    fontFamily: "Poppins",
                    backgroundColor: "#FF5858",
                    transition: "all .15s ease-in-out",
                    textTransform: "capitalize",
                    color: "#fff",
                    "&:hover": {
                      background: "#DC1919",
                    },
                  }}
                  onClick={() =>
                    deleteUser(
                      userInFocus.id,
                      userInFocus.firstName,
                      userInFocus.lastName
                    )
                  }
                >
                  Yes
                </Button>
                <Button
                  sx={{
                    borderRadius: "1rem",
                    fontFamily: "Poppins",
                    backgroundColor: "#C4C4C4",
                    transition: "all .15s ease-in-out",
                    textTransform: "capitalize",
                    color: "#fff",
                    "&:hover": {
                      background: "#9C9999",
                    },
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </Fade>
          </Modal>
        ) : (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontFamily: "Poppins" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Deleting user...
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              </Box>
            </Fade>
          </Modal>
        )}{" "}
        {!isUpdating ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={promoteOpen}
            onClose={handlePromoteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={promoteOpen}>
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontFamily: "Poppins" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Promote {userInFocus.firstName} to admin?
                </Typography>

                <Button
                  sx={{
                    borderRadius: "1rem",
                    fontFamily: "Poppins",
                    backgroundColor: "#FF5858",
                    transition: "all .15s ease-in-out",
                    textTransform: "capitalize",
                    color: "#fff",
                    "&:hover": {
                      background: "#DC1919",
                    },
                  }}
                  onClick={() =>
                    promoteUser(
                      userInFocus.id,
                      userInFocus.firstName,
                      userInFocus.lastName
                    )
                  }
                >
                  Yes
                </Button>
                <Button
                  sx={{
                    borderRadius: "1rem",
                    fontFamily: "Poppins",
                    backgroundColor: "#C4C4C4",
                    transition: "all .15s ease-in-out",
                    textTransform: "capitalize",
                    color: "#fff",
                    "&:hover": {
                      background: "#9C9999",
                    },
                  }}
                  onClick={handlePromoteClose}
                >
                  Cancel
                </Button>
              </Box>
            </Fade>
          </Modal>
        ) : (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={promoteOpen}
            onClose={handlePromoteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={promoteOpen}>
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontFamily: "Poppins" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Promoting user...
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              </Box>
            </Fade>
          </Modal>
        )}
        {!isUpdating ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={demoteOpen}
            onClose={handleDemoteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={demoteOpen}>
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontFamily: "Poppins" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Demote {userInFocus.firstName} to user?
                </Typography>

                <Button
                  sx={{
                    borderRadius: "1rem",
                    fontFamily: "Poppins",
                    backgroundColor: "#FF5858",
                    transition: "all .15s ease-in-out",
                    textTransform: "capitalize",
                    color: "#fff",
                    "&:hover": {
                      background: "#DC1919",
                    },
                  }}
                  onClick={() =>
                    demoteUser(
                      userInFocus.id,
                      userInFocus.firstName,
                      userInFocus.lastName
                    )
                  }
                >
                  Yes
                </Button>
                <Button
                  sx={{
                    borderRadius: "1rem",
                    fontFamily: "Poppins",
                    backgroundColor: "#C4C4C4",
                    transition: "all .15s ease-in-out",
                    textTransform: "capitalize",
                    color: "#fff",
                    "&:hover": {
                      background: "#9C9999",
                    },
                  }}
                  onClick={handleDemoteClose}
                >
                  Cancel
                </Button>
              </Box>
            </Fade>
          </Modal>
        ) : (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={demoteOpen}
            onClose={handleDemoteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={demoteOpen}>
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontFamily: "Poppins" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h3"
                >
                  Demoting user...
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              </Box>
            </Fade>
          </Modal>
        )}
      </Container>
      <Button
        onClick={() => navigate("/admin")}
        sx={{
          backgroundColor: "#0B814A",
          color: "#F1F8F6",
          fontFamily: "Poppins",
          borderRadius: "70px",
          border: "none",
          width: "fit-content",
          fontSize: ".7rem",
          marginBottom: "1rem",
          px: "1rem",
          transition: "all .15s ease-in-out",
          textTransform: "none",
          alignSelf: "end",
          "&:hover": {
            background: "#0AA35C",
            transform: "scale(1.01)",
          },
        }}
      >
        <Refresh fontSize="small" sx={{ mr: ".2rem" }} />
        Refresh
      </Button>
    </Container>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",
  textAlign: "center",
};

export default AdminUsers;
