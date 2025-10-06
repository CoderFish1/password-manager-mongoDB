import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordRef = useRef();

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to ClipBoard!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
    }
  };

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async (params) => {
    let req = await fetch("http://localhost:3000")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  }
  

  useEffect(() => {
   getpasswords()
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
     if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
      const newPassword = { ...form, id: uuidv4() };
    setPasswordArray([...passwordArray, newPassword]);

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPassword),
    });
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([...passwordArray, newPassword])
    // );
    // console.log([...passwordArray, newPassword]);
    setform({ site: "", username: "", password: "" })
    toast.info("Password saved!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
     }
     else{
      toast('ERROR : Password not saved ! ');
     }
    
  };

  const editPassword = async (id) => {
  const pwd = passwordArray.find(i => i.id === id);
  setform(pwd);
  setPasswordArray(passwordArray.filter(i => i.id !== id)); // deletes from UI
  // deletes from the backend part
  await fetch("http://localhost:3000/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};


  const deletePassword =  async (id) => {
    let c = confirm("Do you want to really delete the Password?");
    if (c) {
      setPasswordArray(passwordArray.filter((i) => i.id !== id));
      let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id }),
    });
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordArray.filter((i) => i.id !== id))
    // );
    // console.log("deleting password with id", id);
    toast.info("Password Deleted!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }
  };

  return (
    <div className="relative flex justify-center items-center overflow-x-hidden">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <div className="absolute top-0 -z-10 h-full w-full bg-[rgba(173,109,244,0.5)">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px] "></div>
      </div>

      <div className="container  flex justify-center flex-col items-center gap-5 mt-20">
        <div className="heading text-center">
          <h1 className="font-bold text-4xl font-bitcount lg:text-5xl">Password Manager</h1>
          <p className="md:text-[1.4vw] font-anton text-[3.5vw]">
            Relax
            <span className="font-semibold text-blue-600"> PassVault</span> is
            here to manage to your Passwords
          </p>
        </div>
        <div className="inputs p-6 flex flex-col items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="bg-blue-400 w-90 md:w-135 m-4 p-2 rounded-bl-2xl rounded-br-2xl"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
          />
          <div className="credentials flex flex-wrap">
            <div className="username">
              <input
                value={form.username}
                onChange={handleChange}
                className="bg-amber-50 p-1.5 md:w-82 w-70 m-4 rounded-l-2xl rounded-r-2xl"
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
              />
            </div>
            <div className="pass relative">
              <input
                value={form.password}
                ref={passwordRef}
                onChange={handleChange}
                className="bg-amber-50 m-4 p-1.5 rounded-l-2xl rounded-r-2xl "
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
              <lord-icon
                src="https://cdn.lordicon.com/dicvhxpz.json"
                trigger="hover"
                className="absolute right-4.5 top-4.5 cursor-pointer"
                onClick={showPassword}
              ></lord-icon>
            </div>
          </div>
        </div>
        <button
          className="relative bg-blue-300 p-3 pl-8 rounded-2xl cursor-pointer hover:bg-blue-400"
          onClick={savePassword}
        >
          <lord-icon
            src="https://cdn.lordicon.com/jectmwqf.json"
            trigger="hover"
            className="absolute left-0 top-2"
          ></lord-icon>
          <span className="font-medium">&nbsp;Save Details</span>
        </button>

        <div className="viewPassword">
          <h1 className="md:text-[1.5vw] font-semibold py-2 md:mx-0 mx-5">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <div className="text-center font-mono pb-38 md:pb-12">No Passwords added !!!</div>
          )}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              <table className=":w-full text-left table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Site URL</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Password</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                {passwordArray.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="w-[25vw] px-4 py-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          &nbsp;
                          <i
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="ri-file-copy-line"
                          ></i>
                        </td>
                        <td className=" w-[20vw] px-4 py-2">
                          {item.username}
                          &nbsp;
                          <i
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="ri-file-copy-line"
                          ></i>
                        </td>
                        <td className=" w-[15vw] px-4 py-2">
                          {"*".repeat(item.password.length)}
                          &nbsp;
                          <i
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="ri-file-copy-line"
                          ></i>
                        </td>
                        <td className=" w-[15vw] px-4 py-2">
                          &nbsp;
                          <i
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            class="ri-pencil-line"
                          ></i>
                          &nbsp;&nbsp;
                          <i
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            class="ri-delete-bin-line"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          )}

        </div>
      </div>
      <div class="footer font-cedarville fixed text-xl top-16  md:top-auto md:bottom-1.5 md:right-0 md:fixed lg:fixed">

        Created by <span className="font-bold">Shrey</span> with 💻
      </div>
    </div>
  );
};

export default Manager;
