import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";
import { MdEditNote, MdDelete } from "react-icons/md";
import { nanoid } from "nanoid";

const ToDo = () => {
  const [values, setValues] = useState("");
  const [lists, setLists] = useState(retriveValue());
  const [edit, setEdit] = useState(null);
  const [toggle, setToggle] = useState(true);

  //function to retrive local storage value

  function retriveValue() {
    let list = JSON.parse(localStorage.getItem("lists"));
    if (list) {
      return list;
    } else {
      return [];
    }
  }

  //function for adding list

  function addList() {
    if (!values) {
      alert("Please  provide some data");
    } else if (values && !toggle) {
      setLists(
        lists.map((list) => {
          if (list.id === edit) {
            return { ...list, name: values };
          }
          return list;
        })
      );
      setToggle(true);
      setValues("");
      setEdit(null);
    } else {
      const newList = {
        id: nanoid(),
        name: values,
      };
      setLists([...lists, newList]);
      setValues("");
    }
  }

  //edit function

  function editList(index) {
    const newEdit = lists.find((list) => {
      return list.id === index;
    });
    setToggle(false);
    setEdit(index);
    setValues(newEdit.name);
  }

  //Function to delete list

  function deleteList(index) {
    const updatedList = lists.filter((list) => {
      return list.id !== index;
    });

    setLists(updatedList);
  }

  //remove all list

  function removeAll() {
    setLists("");
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <Wrapper>
      <div className="component">
        <h1>To Do List</h1>
        {/* Input for adding list */}
        <div className="addList">
          <input
            type="text"
            placeholder="Add your To-Do here"
            value={values}
            onChange={(event) => setValues(event.target.value)}
          />
          {toggle ? (
            <BsPlus className="plus" onClick={addList} />
          ) : (
            <MdEditNote
              className="edit"
              onClick={addList}
              title="Add after edit"
            />
          )}
        </div>
        {/* Div for showing the list */}
        <ShowList>
          {Object.values(lists).map((list) => {
            return (
              <div className="each-list" key={list.id}>
                <h3>{list.name}</h3>
                <div className="list-btn">
                  <MdEditNote
                    className="edit"
                    onClick={() => editList(list.id)}
                    title="edit"
                  />
                  <MdDelete
                    className="delete"
                    onClick={() => deleteList(list.id)}
                    title="delete"
                  />
                </div>
              </div>
            );
          })}
        </ShowList>
        <DeleteAll>
          <button onClick={removeAll}>Delete All</button>
        </DeleteAll>
      </div>
    </Wrapper>
  );
};

export default ToDo;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blanchedalmond;
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
  .addList {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 45px;
    width: 250px;

    input {
      outline: none;
      border: none;
      font-size: 16px;
      padding: 5px;
      margin-right: 2px;
      &::placeholder {
        font-size: 12px;
      }
    }
    .plus {
      cursor: pointer;
      font-size: 18px;
      &:hover {
        transform: scale(1.2);
      }
    }
    .edit {
      cursor: pointer;
      font-size: 18px;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

const ShowList = styled.div`
  text-align: center;
  margin-top: 10px;
  .each-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1rem;
    margin-bottom: 5px;
    background-color: white;
    &:hover {
      background-color: whitesmoke;
      color: blue;
    }
    .list-btn {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      .delete,
      .edit {
        cursor: pointer;
        font-size: 18px;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
`;

const DeleteAll = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  button {
    font-size: 14px;
    text-transform: uppercase;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: blue;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: blue;
      transform: scale(1.1);
    }
  }
`;
