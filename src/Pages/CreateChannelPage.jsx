import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem('token')

export default function CreateChannelPage() {
  const navigate = useNavigate()

  const [channelInput, setChannelInput] = useState({
    channelName: "",
    channelHandle: ""
  })

  const handleOnChange = (e) => {
    setChannelInput((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5050/api/createChannel", {
      channelName: channelInput.channelName,
      channelHandle: channelInput.channelHandle
    }, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
    const channelHandle =  res.data.channel.channelHandle
    navigate(`/channel/${channelHandle}`)

    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Channel
        </h2>

        {/* Channel Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Name
          </label>
          <input
            type="text"
            name="channelName"
            value={channelInput.channelName}
            onChange={handleOnChange}
            placeholder="Enter channel name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Channel Handle */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Handle
          </label>
          <input
            type="text"
            name="channelHandle"
            value={channelInput.channelHandle}
            onChange={handleOnChange}
            placeholder="@yourhandle"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}
