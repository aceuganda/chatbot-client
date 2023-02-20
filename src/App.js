import "./normal.css";
import "./App.css";
import { useState } from "react";
import Avatar from "./components/Avatar";
import NewChat from "./components/NewChat";
import NavPrompt from "./components/NavPrompt";
import Loading from "./components/Loading";
import Error from "./components/Error";
import NavLinks from "./components/NavLink";
import BotResponse from "./components/BotResponse";
import IntroSection from "./components/IntroSection";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog([...chatLog, { chatPrompt: inputPrompt }]);
    async function callAPI() {

      try {
        const response = await fetch("https://chatbot.aceuganda.org/webhooks/rest/webhook/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender: "mike", message: inputPrompt }),
        });
        const data = await response.json();

        console.log("Response: ", data)

        setChatLog([
          ...chatLog,
          {
            chatPrompt: inputPrompt,
            botMessage: data
          },
        ]);
        setErr(false);
      } catch (err) {
        setErr(err);
      }
    }
    callAPI();
    setInputPrompt("");
  };

  return (
    <div className="App">
      <header>
        <div className="menu">
          <button onClick={() => setShowMenu(true)}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#d9d9e3"
              strokeLinecap="round"
            >
              <path d="M21 18H3M21 12H3M21 6H3" />
            </svg>
          </button>
        </div>
        <h1>COVID-19 Bot</h1>
      </header>
      {showMenu && (
        <nav>
          <div className="navItems">
            <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
            {chatLog.map(
              (chat, idx) =>
                chat.botMessage && (
                  <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
                )
            )}
          </div>
          <div className="navCloseIcon">
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              stroke="#fff"
              width={42}
              height={42}
              onClick={() => setShowMenu(false)}
            >
              <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
            </svg>
          </div>
        </nav>
      )}

      <aside className="sideMenu">
        <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
        <div className="navPromptWrapper">
          {chatLog.map(
            (chat, idx) =>
              chat.botMessage && (
                <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
              )
          )}
        </div>
        {chatLog.length > 0 && (
          <NavLinks
            svg={
              <svg
                fill="#fff"
                viewBox="0 0 24 24"
                data-name="Flat Line"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-line"
                stroke="#fff"
                width={23}
                height={23}
              >
                <path
                  d="M5 8h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5V8Z"
                  transform="rotate(90 12 14)"
                  style={{
                    fill: "#fff202022",
                    strokeWidth: 2,
                  }}
                />
                <path
                  d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
                  style={{
                    fill: "none",
                    stroke: "#fff202022000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
                <path
                  data-name="primary"
                  d="M10 11v6m4-6v6M4 7h16m-2 13V7H6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z"
                  style={{
                    fill: "none",
                    stroke: "#fff202022000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
              </svg>
            }
            text="Clear Conversations"
            setChatLog={setChatLog}
          />
        )}
        
        <NavLinks
          svg={
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={25}
              height={25}
            >
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5m-6 0 7.5-7.5M15 3h6v6"
              />
            </svg>
          }
          text="Updates & FAQ"
          link="https://ace.ac.ug"
        />
      </aside>

      <section className="chatBox">
        {chatLog.length > 0 ? (
          <div className="chatLogWrapper">
            {chatLog.length > 0 &&
              chatLog.map((chat, idx) => (
                <div className="chatLog" key={idx}>
                  <div className="chatPromptMainContainer">
                    <div className="chatPromptWrapper">
                      <Avatar bg="#5437DB" className="userSVG">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth={1.9}
                          viewBox="0 0 24 24"
                          // strokeLinecap="round"
                          // strokeLinejoin="round"
                          className="h-6 w-6"
                          height={40}
                          width={40}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                      </Avatar>
                      <div id="chatPrompt">{chat.chatPrompt}</div>
                    </div>
                  </div>

                  <div className="botMessageMainContainer">
                    <div className="botMessageWrapper">
                      <Avatar bg="white" className="openaiSVG">
                                              
                          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="61" height="51" viewBox="0 0 466.000000 464.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,464.000000) scale(0.100000,-0.100000)" fill="red" stroke="none">
                              <path d="M741 4464 c-29 -36 -26 -60 9 -96 25 -24 36 -29 58 -23 43 10 62 34
                          62 75 0 46 -25 70 -73 70 -27 0 -41 -7 -56 -26z"/>
                              <path d="M986 4474 c-39 -39 -27 -103 23 -124 73 -30 136 65 81 120 -24 24
                          -82 27 -104 4z"/>
                              <path d="M1211 4464 c-24 -30 -26 -43 -10 -78 34 -73 139 -44 139 38 0 63 -89
                          90 -129 40z"/>
                              <path d="M1450 4470 c-59 -59 14 -154 89 -116 46 24 56 77 21 114 -27 29 -83
                          29 -110 2z"/>
                              <path d="M540 4253 c-32 -12 -50 -37 -50 -70 0 -85 114 -102 143 -21 11 31
                          -12 76 -45 87 -17 6 -31 11 -32 10 -1 0 -8 -3 -16 -6z"/>
                              <path d="M764 4248 c-22 -10 -44 -47 -44 -72 0 -7 9 -25 21 -40 26 -33 79 -36
                          109 -6 30 30 27 83 -6 109 -29 23 -48 25 -80 9z"/>
                              <path d="M1005 4248 c-48 -28 -57 -70 -24 -112 41 -52 129 -22 129 45 0 53
                          -62 93 -105 67z"/>
                              <path d="M1234 4248 c-22 -10 -44 -47 -44 -72 0 -7 9 -25 21 -40 26 -33 79
                          -36 109 -6 30 30 27 83 -6 109 -29 23 -48 25 -80 9z"/>
                              <path d="M1473 4250 c-45 -18 -57 -81 -23 -118 43 -46 130 -13 130 50 0 51
                          -58 88 -107 68z"/>
                              <path d="M1696 4239 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 12 15 21
                          33 21 40 0 26 -23 62 -47 73 -34 16 -47 14 -77 -10z"/>
                              <path d="M2166 4239 c-20 -16 -26 -29 -26 -59 0 -46 26 -70 76 -70 66 0 92 82
                          40 127 -33 28 -56 29 -90 2z"/>
                              <path d="M2396 4239 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 24 30 26
                          43 10 77 -11 24 -47 47 -73 47 -7 0 -25 -9 -40 -21z"/>
                              <path d="M282 4000 c-47 -44 -16 -130 47 -130 68 0 99 74 51 125 -29 30 -68
                          32 -98 5z"/>
                              <path d="M512 4000 c-47 -44 -16 -130 46 -130 60 0 95 56 68 109 -24 46 -77
                          56 -114 21z"/>
                              <path d="M762 4013 c-21 -8 -43 -61 -36 -88 21 -84 144 -67 144 20 0 56 -54
                          90 -108 68z"/>
                              <path d="M985 3995 c-14 -13 -25 -36 -25 -50 0 -35 42 -75 78 -75 36 0 72 37
                          72 74 0 34 -41 76 -75 76 -14 0 -37 -11 -50 -25z"/>
                              <path d="M1215 3995 c-14 -13 -25 -36 -25 -50 0 -35 42 -75 78 -75 65 0 97 89
                          46 129 -35 28 -69 26 -99 -4z"/>
                              <path d="M1455 3995 c-49 -48 -16 -125 52 -125 37 0 73 38 73 77 0 32 -42 73
                          -75 73 -14 0 -37 -11 -50 -25z"/>
                              <path d="M1696 3999 c-53 -41 -21 -129 46 -129 36 0 78 40 78 75 0 33 -41 75
                          -73 75 -13 0 -36 -9 -51 -21z"/>
                              <path d="M1926 3999 c-52 -41 -20 -129 48 -129 34 0 76 41 76 75 0 33 -41 75
                          -73 75 -13 0 -36 -9 -51 -21z"/>
                              <path d="M2162 4000 c-47 -44 -16 -130 46 -130 60 0 95 56 68 109 -24 46 -77
                          56 -114 21z"/>
                              <path d="M2401 4003 c-54 -45 -24 -133 45 -133 44 0 74 29 74 73 0 64 -71 99
                          -119 60z"/>
                              <path d="M2642 4013 c-21 -8 -43 -61 -36 -88 21 -84 144 -67 144 20 0 56 -54
                          90 -108 68z"/>
                              <path d="M2865 3995 c-14 -13 -25 -36 -25 -50 0 -35 42 -75 78 -75 65 0 97 89
                          46 129 -35 28 -69 26 -99 -4z"/>
                              <path d="M52 3774 c-29 -20 -31 -93 -4 -117 27 -24 69 -21 97 8 32 31 32 69 0
                          100 -28 29 -61 32 -93 9z"/>
                              <path d="M282 3770 c-47 -44 -16 -130 46 -130 77 0 105 89 43 137 -24 19 -65
                          15 -89 -7z"/>
                              <path d="M516 3769 c-51 -40 -23 -129 42 -129 60 0 95 56 68 109 -24 46 -67
                          54 -110 20z"/>
                              <path d="M762 3783 c-21 -8 -43 -61 -36 -88 21 -83 144 -67 144 19 0 53 -57
                          90 -108 69z"/>
                              <path d="M985 3765 c-30 -30 -32 -64 -4 -99 42 -54 129 -19 129 51 0 22 -8 38
                          -26 52 -35 28 -69 26 -99 -4z"/>
                              <path d="M1215 3765 c-14 -13 -25 -36 -25 -50 0 -35 42 -75 78 -75 65 0 97 89
                          46 129 -35 28 -69 26 -99 -4z"/>
                              <path d="M1455 3765 c-49 -48 -16 -125 52 -125 37 0 73 38 73 77 0 32 -42 73
                          -75 73 -14 0 -37 -11 -50 -25z"/>
                              <path d="M1696 3769 c-33 -26 -36 -79 -6 -109 48 -48 139 -2 126 63 -12 62
                          -70 85 -120 46z"/>
                              <path d="M1926 3769 c-52 -41 -20 -129 48 -129 34 0 76 41 76 75 0 33 -41 75
                          -73 75 -13 0 -36 -9 -51 -21z"/>
                              <path d="M2175 3778 c-28 -16 -35 -28 -35 -65 0 -61 66 -94 117 -58 74 52 -3
                          168 -82 123z"/>
                              <path d="M2400 3770 c-50 -50 -26 -122 43 -128 47 -4 77 25 77 72 0 63 -77 99
                          -120 56z"/>
                              <path d="M2642 3783 c-21 -8 -43 -61 -36 -88 21 -83 144 -67 144 19 0 53 -57
                          90 -108 69z"/>
                              <path d="M2865 3765 c-30 -30 -32 -64 -4 -99 42 -54 129 -19 129 51 0 22 -8
                          38 -26 52 -35 28 -69 26 -99 -4z"/>
                              <path d="M48 3536 c-28 -21 -25 -100 4 -120 32 -23 65 -20 93 9 32 31 32 69 0
                          100 -27 28 -70 32 -97 11z"/>
                              <path d="M280 3530 c-24 -24 -27 -82 -4 -104 39 -39 103 -27 124 23 30 73 -65
                          136 -120 81z"/>
                              <path d="M510 3530 c-30 -30 -27 -83 6 -109 43 -34 86 -24 113 26 36 69 -63
                          139 -119 83z"/>
                              <path d="M753 3535 c-40 -28 -37 -89 6 -122 43 -33 111 6 111 63 0 62 -65 95
                          -117 59z"/>
                              <path d="M981 3524 c-28 -35 -26 -69 4 -99 30 -30 64 -32 99 -4 54 42 19 129
                          -51 129 -22 0 -38 -8 -52 -26z"/>
                              <path d="M1211 3524 c-28 -35 -26 -69 4 -99 30 -30 64 -32 99 -4 33 26 36 79
                          6 109 -30 30 -83 27 -109 -6z"/>
                              <path d="M1452 3527 c-12 -13 -22 -36 -22 -51 0 -34 41 -76 75 -76 33 0 75 41
                          75 73 0 67 -83 102 -128 54z"/>
                              <path d="M1690 3530 c-30 -30 -27 -83 6 -109 50 -39 108 -16 120 46 13 65 -78
                          111 -126 63z"/>
                              <path d="M1920 3530 c-30 -30 -27 -83 6 -109 35 -28 69 -26 99 4 30 30 32 64
                          4 99 -26 33 -79 36 -109 6z"/>
                              <path d="M2160 3530 c-24 -24 -27 -82 -4 -104 39 -39 103 -27 124 23 30 73
                          -65 136 -120 81z"/>
                              <path d="M2393 3524 c-20 -20 -24 -31 -19 -57 12 -62 70 -85 120 -46 19 15 26
                          30 26 55 0 70 -76 99 -127 48z"/>
                              <path d="M2633 3535 c-40 -28 -37 -89 6 -122 43 -33 111 6 111 63 0 62 -65 95
                          -117 59z"/>
                              <path d="M2861 3524 c-28 -35 -26 -69 4 -99 30 -30 64 -32 99 -4 54 42 19 129
                          -51 129 -22 0 -38 -8 -52 -26z"/>
                              <path d="M3095 3525 c-28 -27 -31 -46 -13 -78 26 -50 69 -60 112 -26 19 15 26
                          30 26 55 0 69 -76 99 -125 49z"/>
                              <path d="M47 3302 c-23 -26 -23 -100 1 -118 44 -34 122 5 122 61 0 59 -86 98
                          -123 57z"/>
                              <path d="M749 3301 c-51 -41 -17 -131 50 -131 37 0 71 38 71 78 0 63 -71 94
                          -121 53z"/>
                              <path d="M985 3295 c-14 -13 -25 -36 -25 -50 0 -33 41 -75 73 -75 39 0 77 36
                          77 74 0 68 -78 99 -125 51z"/>
                              <path d="M1215 3295 c-14 -13 -25 -36 -25 -50 0 -33 41 -75 73 -75 39 0 77 36
                          77 74 0 68 -78 99 -125 51z"/>
                              <path d="M1452 3297 c-45 -48 -11 -127 55 -127 31 0 73 42 73 73 0 67 -83 102
                          -128 54z"/>
                              <path d="M1690 3300 c-12 -12 -20 -33 -20 -55 0 -94 128 -102 146 -8 13 65
                          -78 111 -126 63z"/>
                              <path d="M2160 3300 c-43 -43 -13 -130 44 -130 38 0 56 10 72 41 38 75 -57
                          148 -116 89z"/>
                              <path d="M2395 3295 c-14 -13 -25 -36 -25 -50 0 -33 41 -75 73 -75 40 0 77 36
                          77 76 0 69 -76 99 -125 49z"/>
                              <path d="M2629 3301 c-51 -41 -17 -131 50 -131 39 0 71 34 71 75 0 66 -69 98
                          -121 56z"/>
                              <path d="M2865 3295 c-14 -13 -25 -36 -25 -50 0 -33 41 -75 73 -75 39 0 77 36
                          77 74 0 68 -78 99 -125 51z"/>
                              <path d="M3093 3294 c-20 -20 -24 -31 -19 -57 12 -62 70 -85 120 -46 34 27 36
                          77 3 107 -31 30 -72 28 -104 -4z"/>
                              <path d="M277 3292 c-27 -30 -22 -87 9 -111 34 -27 57 -26 88 2 35 31 39 57
                          16 95 -17 27 -25 32 -58 32 -25 0 -45 -7 -55 -18z"/>
                              <path d="M507 3292 c-27 -30 -22 -87 9 -111 36 -28 60 -26 95 8 34 35 36 59 8
                          95 -25 32 -86 37 -112 8z"/>
                              <path d="M1920 3290 c-36 -36 -21 -102 27 -121 35 -13 77 4 92 37 16 35 14 48
                          -10 78 -26 33 -79 36 -109 6z"/>
                              <path d="M48 3069 c-13 -7 -18 -23 -18 -59 0 -42 4 -52 25 -66 65 -42 144 42
                          98 104 -22 30 -74 40 -105 21z"/>
                              <path d="M277 3062 c-27 -30 -22 -87 9 -111 34 -27 57 -26 90 2 33 28 37 76 9
                          107 -24 26 -85 27 -108 2z"/>
                              <path d="M512 3064 c-19 -13 -22 -23 -20 -56 7 -94 121 -102 144 -11 15 59
                          -70 106 -124 67z"/>
                              <path d="M741 3054 c-12 -15 -21 -33 -21 -40 0 -26 23 -62 47 -73 34 -16 47
                          -14 77 10 35 27 37 90 4 113 -35 25 -83 20 -107 -10z"/>
                              <path d="M981 3054 c-34 -43 -26 -86 20 -110 53 -27 109 8 109 68 0 65 -89 93
                          -129 42z"/>
                              <path d="M1211 3054 c-24 -30 -26 -43 -10 -77 11 -25 47 -47 75 -47 26 0 64
                          47 64 80 0 67 -88 97 -129 44z"/>
                              <path d="M1450 3060 c-46 -46 -11 -124 55 -124 66 0 99 74 55 122 -27 29 -83
                          29 -110 2z"/>
                              <path d="M1690 3060 c-47 -47 1 -142 63 -126 88 22 83 136 -6 144 -26 2 -42
                          -3 -57 -18z"/>
                              <path d="M1920 3060 c-28 -28 -26 -75 5 -105 13 -14 31 -25 39 -25 28 0 64 22
                          75 47 16 34 14 47 -10 77 -26 33 -79 36 -109 6z"/>
                              <path d="M2157 3062 c-27 -30 -22 -87 9 -111 34 -27 57 -26 90 2 33 28 37 76
                          9 107 -24 26 -85 27 -108 2z"/>
                              <path d="M2390 3053 c-23 -30 -22 -76 3 -100 44 -45 127 -10 127 53 0 71 -86
                          103 -130 47z"/>
                              <path d="M2621 3054 c-24 -30 -26 -43 -10 -77 11 -24 47 -47 73 -47 7 0 25 9
                          40 21 35 27 37 90 4 113 -35 25 -83 20 -107 -10z"/>
                              <path d="M2861 3054 c-34 -43 -26 -86 20 -110 53 -27 109 8 109 68 0 65 -89
                          93 -129 42z"/>
                              <path d="M3091 3054 c-12 -15 -21 -35 -21 -46 0 -26 53 -78 80 -78 31 0 70 44
                          70 80 0 67 -88 97 -129 44z"/>
                              <path d="M3330 3060 c-46 -46 -11 -124 55 -124 66 0 99 74 55 122 -27 29 -83
                          29 -110 2z"/>
                              <path d="M3570 3060 c-15 -15 -20 -31 -18 -57 8 -89 122 -94 144 -6 16 62 -79
                          110 -126 63z"/>
                              <path d="M286 2829 c-20 -16 -26 -29 -26 -58 0 -47 24 -71 72 -71 70 0 98 80
                          44 127 -33 28 -56 29 -90 2z"/>
                              <path d="M516 2829 c-32 -25 -37 -86 -8 -112 30 -27 87 -22 111 9 28 36 26 60
                          -8 95 -35 34 -59 36 -95 8z"/>
                              <path d="M749 2821 c-34 -35 -36 -59 -8 -95 25 -32 86 -37 112 -8 27 30 22 87
                          -9 111 -36 28 -60 26 -95 -8z"/>
                              <path d="M1005 2838 c-48 -28 -57 -70 -24 -112 40 -51 129 -23 129 42 -1 31
                          -16 54 -47 70 -26 15 -33 15 -58 0z"/>
                              <path d="M1234 2839 c-22 -11 -44 -48 -44 -73 0 -7 9 -25 21 -40 41 -52 129
                          -23 129 43 0 55 -59 93 -106 70z"/>
                              <path d="M1473 2840 c-44 -18 -57 -86 -23 -120 27 -27 83 -27 110 2 34 37 25
                          90 -21 113 -32 17 -35 17 -66 5z"/>
                              <path d="M1720 2843 c-51 -19 -68 -85 -30 -123 30 -30 83 -27 109 6 12 15 21
                          33 21 40 0 26 -23 62 -47 73 -26 12 -30 12 -53 4z"/>
                              <path d="M1943 2840 c-26 -11 -43 -40 -43 -74 0 -63 89 -90 129 -40 12 15 21
                          33 21 40 0 26 -23 62 -47 73 -28 13 -30 13 -60 1z"/>
                              <path d="M2190 2843 c-33 -12 -50 -37 -50 -73 0 -46 25 -70 72 -70 70 0 98 80
                          44 127 -27 23 -39 26 -66 16z"/>
                              <path d="M2413 2838 c-44 -21 -53 -87 -17 -123 24 -24 90 -19 108 7 47 67 -20
                          151 -91 116z"/>
                              <path d="M2629 2821 c-34 -35 -36 -59 -8 -95 25 -32 86 -37 112 -8 27 30 22
                          87 -9 111 -36 28 -60 26 -95 -8z"/>
                              <path d="M2885 2838 c-48 -28 -57 -70 -24 -112 41 -52 129 -23 129 43 0 55
                          -61 95 -105 69z"/>
                              <path d="M3114 2839 c-22 -11 -44 -48 -44 -73 0 -7 9 -25 21 -40 41 -52 129
                          -23 129 43 0 55 -59 93 -106 70z"/>
                              <path d="M3353 2840 c-44 -18 -57 -86 -23 -120 27 -27 83 -27 110 2 34 37 25
                          90 -21 113 -32 17 -35 17 -66 5z"/>
                              <path d="M3600 2843 c-51 -19 -68 -85 -30 -123 30 -30 83 -27 109 6 12 15 21
                          33 21 40 0 26 -23 62 -47 73 -26 12 -30 12 -53 4z"/>
                              <path d="M3823 2840 c-45 -18 -57 -81 -23 -118 30 -32 82 -30 109 4 12 15 21
                          33 21 40 0 26 -23 62 -47 73 -28 13 -30 13 -60 1z"/>
                              <path d="M1720 2613 c-51 -19 -69 -93 -32 -126 30 -27 87 -22 111 9 12 15 21
                          33 21 40 0 29 -25 64 -53 74 -16 5 -30 10 -31 9 -1 0 -8 -3 -16 -6z"/>
                              <path d="M1943 2610 c-43 -18 -59 -93 -25 -123 30 -27 87 -22 111 9 12 15 21
                          33 21 40 0 29 -25 64 -53 74 -16 5 -30 10 -31 9 -1 0 -11 -4 -23 -9z"/>
                              <path d="M2190 2613 c-51 -18 -69 -93 -32 -126 26 -24 85 -22 107 3 47 52 -10
                          146 -75 123z"/>
                              <path d="M2423 2610 c-33 -14 -56 -55 -48 -87 10 -43 24 -53 71 -53 50 0 74
                          25 74 76 0 48 -51 82 -97 64z"/>
                              <path d="M2653 2610 c-32 -13 -56 -55 -49 -84 9 -38 34 -56 75 -56 47 0 71 24
                          71 72 0 52 -49 87 -97 68z"/>
                              <path d="M3119 2609 c-25 -9 -49 -45 -49 -73 0 -7 9 -25 21 -40 41 -52 129
                          -23 129 43 0 54 -50 88 -101 70z"/>
                              <path d="M3355 2608 c-46 -25 -59 -74 -29 -116 20 -29 85 -31 114 -2 35 35 25
                          92 -21 115 -33 18 -38 18 -64 3z"/>
                              <path d="M3593 2610 c-43 -18 -59 -93 -25 -123 30 -27 87 -22 111 9 12 15 21
                          33 21 40 0 29 -25 64 -53 74 -16 5 -30 10 -31 9 -1 0 -11 -4 -23 -9z"/>
                              <path d="M516 2589 c-51 -40 -23 -129 42 -129 57 0 96 56 71 103 -27 50 -70
                          60 -113 26z"/>
                              <path d="M759 2597 c-62 -48 -34 -137 43 -137 65 0 93 89 42 129 -30 23 -61
                          26 -85 8z"/>
                              <path d="M1455 2585 c-49 -48 -16 -125 52 -125 37 0 73 38 73 77 0 32 -42 73
                          -75 73 -14 0 -37 -11 -50 -25z"/>
                              <path d="M2865 2585 c-30 -30 -32 -64 -4 -99 42 -54 129 -19 129 51 0 22 -8
                          38 -26 52 -35 28 -69 26 -99 -4z"/>
                              <path d="M3806 2589 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 28 35 26
                          69 -4 99 -30 30 -64 32 -99 4z"/>
                              <path d="M1696 2359 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 28 36 26
                          60 -8 95 -35 34 -59 36 -95 8z"/>
                              <path d="M1926 2359 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 28 35 26
                          69 -4 99 -30 30 -64 32 -99 4z"/>
                              <path d="M2166 2359 c-50 -40 -23 -129 40 -129 58 0 92 45 73 98 -9 28 -44 52
                          -73 52 -7 0 -25 -9 -40 -21z"/>
                              <path d="M2414 2368 c-22 -10 -44 -47 -44 -72 0 -7 9 -25 21 -40 26 -33 79
                          -36 109 -6 30 30 27 83 -6 109 -29 23 -48 25 -80 9z"/>
                              <path d="M2643 2368 c-30 -15 -46 -58 -34 -91 12 -30 39 -47 75 -47 63 0 90
                          89 40 129 -29 23 -48 25 -81 9z"/>
                              <path d="M2865 2355 c-30 -30 -32 -64 -4 -99 41 -53 129 -23 129 44 0 38 -39
                          80 -75 80 -14 0 -37 -11 -50 -25z"/>
                              <path d="M3093 2354 c-20 -20 -24 -31 -19 -57 18 -93 146 -87 146 7 0 25 -7
                          40 -26 55 -36 28 -70 26 -101 -5z"/>
                              <path d="M3335 2355 c-32 -31 -33 -74 -2 -103 72 -67 172 34 102 103 -13 14
                          -36 25 -50 25 -14 0 -37 -11 -50 -25z"/>
                              <path d="M3576 2359 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 28 36 26
                          66 -5 98 -32 31 -62 33 -98 5z"/>
                              <path d="M1692 2120 c-47 -44 -13 -130 52 -130 34 0 76 41 76 75 0 35 -42 75
                          -78 75 -15 0 -38 -9 -50 -20z"/>
                              <path d="M1922 2117 c-45 -48 -11 -127 55 -127 32 0 73 42 73 75 0 35 -42 75
                          -78 75 -17 0 -37 -9 -50 -23z"/>
                              <path d="M2160 2120 c-27 -27 -27 -83 2 -110 37 -35 90 -25 114 21 38 75 -57
                          148 -116 89z"/>
                              <path d="M2401 2123 c-11 -10 -24 -32 -27 -50 -5 -26 -1 -37 19 -57 50 -50
                          127 -18 127 52 0 62 -71 94 -119 55z"/>
                              <path d="M2633 2125 c-29 -20 -37 -59 -19 -94 37 -71 136 -46 136 34 0 63 -65
                          97 -117 60z"/>
                              <path d="M2865 2115 c-14 -13 -25 -36 -25 -50 0 -33 41 -75 73 -75 39 0 77 36
                          77 74 0 68 -78 99 -125 51z"/>
                              <path d="M3095 2115 c-29 -28 -31 -45 -10 -84 23 -46 66 -54 109 -20 34 27 36
                          77 3 107 -31 29 -72 28 -102 -3z"/>
                              <path d="M3332 2117 c-12 -13 -22 -36 -22 -51 0 -34 41 -76 75 -76 33 0 75 41
                          75 73 0 67 -83 102 -128 54z"/>
                              <path d="M1922 1887 c-46 -48 -15 -127 48 -127 38 0 80 39 80 75 0 35 -42 75
                          -78 75 -17 0 -37 -9 -50 -23z"/>
                              <path d="M1690 1880 c-30 -30 -27 -83 6 -109 30 -24 43 -26 77 -10 71 32 47
                          139 -30 139 -20 0 -41 -8 -53 -20z"/>
                              <path d="M2162 1884 c-33 -23 -31 -86 4 -113 34 -27 57 -26 90 2 52 45 26 127
                          -40 127 -17 0 -42 -7 -54 -16z"/>
                              <path d="M2391 1874 c-24 -30 -26 -43 -10 -77 11 -24 47 -47 73 -47 29 0 66
                          41 66 74 0 71 -86 104 -129 50z"/>
                              <path d="M2621 1874 c-12 -15 -21 -33 -21 -40 0 -26 23 -62 47 -73 34 -16 47
                          -14 77 10 33 26 36 79 6 109 -30 30 -83 27 -109 -6z"/>
                              <path d="M2861 1874 c-34 -43 -26 -86 20 -109 39 -21 56 -19 84 10 50 49 20
                          125 -49 125 -25 0 -40 -7 -55 -26z"/>
                              <path d="M3091 1874 c-24 -30 -26 -43 -10 -77 11 -24 47 -47 73 -47 7 0 25 9
                          40 21 33 26 36 79 6 109 -30 30 -83 27 -109 -6z"/>
                              <path d="M1919 1649 c-46 -46 2 -141 65 -125 33 8 66 44 66 72 0 12 -9 33 -21
                          48 -26 33 -79 36 -110 5z"/>
                              <path d="M2162 1654 c-33 -23 -31 -86 4 -113 15 -12 33 -21 40 -21 28 0 63 24
                          74 49 29 71 -54 130 -118 85z"/>
                              <path d="M2391 1644 c-24 -30 -26 -43 -10 -77 11 -24 47 -47 73 -47 29 0 66
                          41 66 74 0 71 -86 104 -129 50z"/>
                              <path d="M2628 1653 c-37 -42 -28 -101 19 -122 34 -16 47 -14 77 10 33 26 36
                          79 6 109 -25 25 -81 27 -102 3z"/>
                              <path d="M2861 1644 c-39 -50 -16 -108 46 -120 65 -13 111 78 63 126 -30 30
                          -83 27 -109 -6z"/>
                              <path d="M3091 1644 c-26 -34 -27 -64 -1 -92 49 -52 122 -29 128 41 6 72 -83
                          107 -127 51z"/>
                              <path d="M3332 1647 c-12 -13 -22 -36 -22 -51 0 -34 41 -76 75 -76 35 0 75 42
                          75 78 0 63 -84 95 -128 49z"/>
                              <path d="M1713 1430 c-43 -17 -57 -81 -25 -119 42 -53 143 -6 127 58 -12 49
                          -60 78 -102 61z"/>
                              <path d="M1943 1430 c-43 -17 -57 -81 -25 -118 33 -40 102 -30 122 18 17 42
                          -1 85 -42 99 -17 6 -31 11 -32 10 -1 0 -11 -4 -23 -9z"/>
                              <path d="M2190 1433 c-51 -19 -69 -93 -31 -127 47 -42 124 -8 124 54 0 47 -52
                          88 -93 73z"/>
                              <path d="M2424 1430 c-26 -10 -54 -48 -54 -72 0 -9 11 -29 23 -44 45 -52 127
                          -25 127 41 0 56 -49 94 -96 75z"/>
                              <path d="M2654 1430 c-26 -10 -54 -48 -54 -72 0 -32 44 -71 79 -70 46 1 71 27
                          71 72 0 54 -48 89 -96 70z"/>
                              <path d="M2889 1429 c-37 -14 -55 -60 -39 -98 15 -38 56 -53 97 -36 88 37 32
                          166 -58 134z"/>
                              <path d="M3119 1429 c-25 -9 -49 -45 -49 -74 0 -8 11 -26 23 -41 46 -53 127
                          -23 127 46 0 53 -50 87 -101 69z"/>
                              <path d="M3353 1425 c-58 -24 -56 -107 2 -131 42 -17 92 4 101 42 17 66 -41
                          115 -103 89z"/>
                              <path d="M1953 1202 c-30 -4 -53 -39 -53 -78 0 -50 48 -81 98 -63 28 9 52 44
                          52 73 0 20 -37 63 -57 68 -10 2 -28 2 -40 0z"/>
                              <path d="M2423 1199 c-34 -12 -56 -53 -48 -88 8 -39 26 -53 69 -54 48 -1 76
                          26 76 73 0 54 -47 88 -97 69z"/>
                              <path d="M2889 1198 c-27 -9 -49 -44 -49 -77 0 -59 94 -88 131 -42 50 62 -7
                          144 -82 119z"/>
                              <path d="M1696 1179 c-33 -26 -36 -79 -5 -110 47 -47 141 2 125 65 -15 62 -72
                          83 -120 45z"/>
                              <path d="M2157 1182 c-17 -19 -23 -78 -9 -99 13 -20 60 -33 85 -24 51 20 67
                          82 32 121 -24 26 -85 27 -108 2z"/>
                              <path d="M2643 1188 c-30 -15 -46 -58 -34 -91 29 -75 141 -56 141 26 0 38 -7
                          50 -37 66 -26 13 -41 13 -70 -1z"/>
                              <path d="M3115 1188 c-49 -26 -58 -69 -24 -112 26 -33 79 -36 109 -6 30 30 27
                          83 -6 109 -30 23 -49 26 -79 9z"/>
                              <path d="M1926 949 c-33 -26 -36 -79 -6 -109 30 -30 83 -27 109 6 34 43 24 86
                          -26 112 -31 17 -47 15 -77 -9z"/>
                              <path d="M2166 949 c-20 -16 -26 -29 -26 -59 0 -46 26 -70 76 -70 75 0 96 108
                          27 139 -34 16 -47 14 -77 -10z"/>
                              <path d="M2414 958 c-22 -10 -44 -47 -44 -72 0 -7 9 -25 21 -40 26 -33 79 -36
                          109 -6 30 30 27 83 -6 109 -29 23 -48 25 -80 9z"/>
                              <path d="M2644 958 c-68 -32 -43 -138 33 -138 70 0 101 86 47 129 -29 23 -48
                          25 -80 9z"/>
                              <path d="M2885 958 c-49 -26 -58 -69 -24 -112 15 -19 30 -26 55 -26 69 0 99
                          76 49 125 -26 27 -49 31 -80 13z"/>
                              <path d="M1922 707 c-67 -72 34 -172 103 -102 14 13 25 36 25 50 0 35 -42 75
                          -78 75 -17 0 -37 -9 -50 -23z"/>
                              <path d="M2160 710 c-43 -43 -13 -130 44 -130 38 0 56 10 72 42 38 73 -58 146
                          -116 88z"/>
                              <path d="M2401 713 c-11 -10 -24 -32 -27 -50 -13 -65 74 -109 124 -63 67 63
                          -26 171 -97 113z"/>
                              <path d="M2629 711 c-52 -42 -17 -131 52 -131 40 0 69 32 69 75 0 65 -70 97
                          -121 56z"/>
                              <path d="M2865 705 c-14 -13 -25 -36 -25 -50 0 -35 42 -75 78 -75 17 0 37 9
                          50 23 67 72 -34 172 -103 102z"/>
                              <path d="M2401 483 c-54 -45 -24 -133 45 -133 44 0 74 29 74 73 0 64 -71 99
                          -119 60z"/>
                              <path d="M2642 493 c-21 -8 -43 -61 -36 -88 21 -84 144 -67 144 20 0 56 -54
                          90 -108 68z"/>
                              <path d="M2160 470 c-30 -30 -27 -83 6 -109 30 -24 43 -26 77 -10 71 32 47
                          139 -30 139 -20 0 -41 -8 -53 -20z"/>
                              <path d="M2160 240 c-24 -24 -27 -82 -5 -104 57 -56 154 3 126 77 -19 48 -85
                          63 -121 27z"/>
                              <path d="M2395 235 c-28 -27 -31 -46 -13 -78 26 -50 69 -60 112 -26 34 27 36
                          77 3 107 -31 29 -72 28 -102 -3z"/>
                              <path d="M2637 249 c-46 -27 -41 -105 9 -128 35 -16 48 -14 78 10 51 40 23
                          129 -41 129 -16 0 -36 -5 -46 -11z" fill="red"/>
                            </g>
                          </svg>

                      </Avatar>
                      {chat.botMessage ? (
                        <div id="botMessage">
                          <BotResponse response={chat.botMessage} />
                        </div>
                      ) : err ? (
                        <Error err={err} />
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <IntroSection />
        )}

        <form onSubmit={handleSubmit}>
          <div className="inputPromptWrapper">
            <input
              name="inputPrompt"
              id=""
              className="inputPrompttTextarea"
              type="text"
              rows="1"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              autoFocus
            ></input>
            <p></p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
