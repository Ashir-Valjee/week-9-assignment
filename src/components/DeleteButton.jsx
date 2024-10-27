"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import React from "react";

export default function DeleteButton({ handleDelete, id }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <form
        action={() => {
          handleDelete(id);
        }}
      >
        <button
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-0.5 border-green-800 border-2
            rounded-lg "
        >
          delete
        </button>
      </form>
    </>
  );
}
