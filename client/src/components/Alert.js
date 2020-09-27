import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/core';
const Alert = (props) => {
  return (
    <AlertDialog
      isOpen={props.isOpenAlert}
      leastDestructiveRef={props.cancelRef}
      onClose={props.onCloseAlert}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete {props.itemType}
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={props.cancelRef} onClick={props.onCloseAlert}>
            Cancel
          </Button>
          <Button
            variantColor="red"
            onClick={() => {
              props.onCloseAlert();
              props.deleteFunction(props.itemToDelete);

              props.onClose && props.onClose();
            }}
            ml={3}
          >
            {props.action}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
