import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAccount } from "../../context/AccountContext";
import EditAccountForm from "./EditAccountForm";

const ManageAccount = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { deleteUser } = useAccount();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "white",
        borderRadius: 5,
        py: "1.5rem",
        w: 1,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          fontWeight: 500,
        }}
      >
        Manage Profile
      </Typography>
      <EditAccountForm />
      <Button
        sx={{
          backgroundColor: "#fff",
          color: "#DC143C",
          fontFamily: "Poppins",
          borderRadius: "70px",
          border: "none",
          width: "fit-content",
          fontSize: ".7rem",
          marginBottom: "1rem",
          px: "1rem",
          transition: "all .15s ease-in-out",
          textTransform: "none",
          alignSelf: "center",
          "&:hover": {
            background: "#DC143C",
            color: "#F1F8F6",
            transform: "scale(1.01)",
          },
        }}
        onClick={handleOpenModal}
      >
        Remove Account
      </Button>

      {/* Modal for confirming account removal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="delete-ac"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 450,
            background: "#f1f8f6",
            borderRadius: "15px",
            boxShadow: 24,
            py: "3rem",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} fontFamily="Poppins">
            Are you sure to delete your account?
          </Typography>
          <Typography variant="body2" fontFamily="Poppins" sx={{ pb: "1rem" }}>
            This action cannot be reverted.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#DC143C",
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
              alignSelf: "center",
              "&:hover": {
                background: "#FF0000",
                transform: "scale(1.01)",
              },
            }}
            onClick={deleteUser}
          >
            Yes
          </Button>
          <Button
            sx={{
              backgroundColor: "#0B814A",
              color: "#F1F8F6",
              fontFamily: "Poppins",
              borderRadius: "70px",
              border: "none",
              width: "fit-content",
              fontSize: ".7rem",
              m: "0 0 1rem 1rem",
              px: "1rem",
              transition: "all .15s ease-in-out",
              textTransform: "none",
              alignSelf: "center",
              "&:hover": {
                background: "#0AA35C",
                transform: "scale(1.01)",
              },
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ManageAccount;
