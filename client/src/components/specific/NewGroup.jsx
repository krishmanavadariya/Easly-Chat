import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length <= 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      member: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      onClose={closeHandler}
      open={isNewGroup}
      PaperProps={{
        style: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
          border: "1px solid rgba(255, 255, 255, 0.2)", // Add a border to enhance the glass effect
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)", // Add gradient background
          transition: "all 0.3s ease-in-out", // Add transition effect
        },
      }}
    >
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle
          textAlign={"center"}
          variant="h4"
          style={{ color: "rgba(255, 255, 255, 0.8)" }} // Update color
        >
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          InputProps={{
            style: {
              color: "rgba(255, 255, 255, 0.8)", // Update color
            },
          }}
          InputLabelProps={{
            style: {
              color: "rgba(255, 255, 255, 0.6)", // Update color
            },
          }}
        />

        <Typography
          variant="body1"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          Members
        </Typography>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friend?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
                style={{
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                  border: "1px solid rgba(255, 255, 255, 0.2)", // Add a border to enhance the glass effect
                }}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
            style={{
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            style={{
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 123, 255, 0.8)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 123, 255, 1)")
            }
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
