import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillPatchCheckFill, BsFillPatchExclamationFill } from "react-icons/bs";
import Loader from "../components/Loader";
// import Score from "../components/Score";

export default function Home() {
    const [showScore, setShowScore] = useState(false);
    const [frontImage, setFrontImage] = useState("");
    const [backImage, setBackImage] = useState({});

    const getScore = (evt) => {
        evt.preventDefault();
        setShowScore(true);
    };

    useEffect(() => {
        document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
            const dropZoneElement = inputElement.closest(".drop-zone");

            dropZoneElement.addEventListener("click", (e) => {
                inputElement.click();
            });

            inputElement.addEventListener("change", (e) => {
                if (inputElement.files.length) {
                    updateThumbnail(dropZoneElement, inputElement.files[0]);
                }
            });

            dropZoneElement.addEventListener("dragover", (e) => {
                e.preventDefault();
                dropZoneElement.classList.add("drop-zone--over");
            });

            ["dragleave", "dragend"].forEach((type) => {
                dropZoneElement.addEventListener(type, (e) => {
                    dropZoneElement.classList.remove("drop-zone--over");
                });
            });

            dropZoneElement.addEventListener("drop", (e) => {
                e.preventDefault();

                if (e.dataTransfer.files.length) {
                    inputElement.files = e.dataTransfer.files;
                    updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
                }

                dropZoneElement.classList.remove("drop-zone--over");
            });
        });
    });

    function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

        // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }

        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone__thumb");
            dropZoneElement.appendChild(thumbnailElement);
        }

        // thumbnailElement.dataset.label = file.name;

        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            };
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
    }

    const [typeOfIdentity, changeTypeOfIdentity] = useState("Adhaar");
    const [loading, setLoading] = useState(false);

    return (
        <>
            {!showScore && (
                <div>
                    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
                        <div className="container flex flex-wrap justify-between items-center mx-auto">
                            <a href="#" className="flex items-center">
                                <span className="self-center text-xl font-semibold whitespace-nowrap">
                                    Document Quality Score
                                </span>
                            </a>
                        </div>
                    </nav>

                    <div className="flex flex-col items-center space-y-10 mt-28">
                        <span className="flex space-x-8">
                            <div className="drop-zone">
                                <span className="drop-zone__prompt">
                                    Drop front image of identity here or click to upload
                                </span>
                                <input
                                    type="file"
                                    name="myFile"
                                    className="drop-zone__input"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setFrontImage(e.target.files[0]);
                                    }}
                                    onDrop={() => {
                                        console.log("hey buddy");
                                    }}
                                />
                            </div>
                            <div className="drop-zone">
                                <span className="drop-zone__prompt">
                                    Drop back image of identity here or click to upload
                                </span>
                                <input
                                    type="file"
                                    name="myFile"
                                    className="drop-zone__input"
                                    onChange={(e) => {
                                        setBackImage(e.target.files[0]);
                                    }}
                                />
                            </div>
                        </span>

                        <div className="flex flex-col items-center space-y-4">
                            <span>
                                <select
                                    id="dropdownDefault"
                                    data-dropdown-toggle="dropdown"
                                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm pl-4 pr-5 py-2.5 text-center inline-flex items-center"
                                    type="button"
                                    value={typeOfIdentity}
                                    onChange={(e) => {
                                        changeTypeOfIdentity(e.target.value);
                                    }}
                                >
                                    <option
                                        className="block py-2 text-center hover:bg-gray-100"
                                        value={"Adhaar"}
                                    >
                                        Adhaar
                                    </option>
                                    <option
                                        className="block py-2 text-center hover:bg-gray-100"
                                        value={"Pan Card"}
                                    >
                                        Pan Card
                                    </option>
                                    <option
                                        className="block py-2 text-center hover:bg-gray-100"
                                        value={"Passport"}
                                    >
                                        Passport
                                    </option>
                                </select>
                            </span>

                            <span>
                                <button
                                    onClick={getScore}
                                    className="block py-2 px-4 bg-white border-2 rounded-xl border-blue-800 hover:bg-blue-600"
                                >
                                    Get Score
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {showScore && (
                <div>
                    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
                        <div className="container flex flex-wrap justify-between items-center mx-auto">
                            <a href="#" className="flex items-center">
                                <span className="self-center text-xl font-semibold whitespace-nowrap">
                                    Document Quality Score
                                </span>
                            </a>
                        </div>
                    </nav>

                    {loading && <Loader />}

                    {!loading && (
                        <div className="my-20">
                            <p className="font-medium leading-tight text-5xl mt-0 mb-2 text-center text-blue-600">
                                Your Score: {"70%"}
                                {/* <Score  score={50} /> */}
                            </p>

                            <div className="mx-10 my-40 p-10 bg-blue-300 rounded-xl space-y-3">
                                <p className="flex justify-between">
                                    Blur Check:
                                    <span>{"70%"}</span>
                                </p>
                                <p className="flex justify-between">
                                    Arteffect Check:{" "}
                                    <span>
                                        {/* <BsFillPatchExclamationFill size={18} /> */}
                                        <BsFillPatchCheckFill size={18} />
                                    </span>
                                </p>
                                <p className="flex justify-between">
                                    Field Check:{" "}
                                    <span>
                                        <BsFillPatchCheckFill size={18} />
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
