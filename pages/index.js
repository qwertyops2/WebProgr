
import React from "react";
import Head from "next/head";
import AwesomeSlider from "react-awesome-slider";

function sendEmail(email, user, animalName) {
    const subject = encodeURIComponent(`Найдено животное: ${animalName}`);
    const name = user ? `${user.name} ${user.surname}` : "Посетитель";

    const body = encodeURIComponent(
        `Здравствуйте! Я нашел вашего питомца (${animalName}).\n\nС уважением, ${name}`
    );

    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`,
        "_blank"
    );
}

export default function Home() {
    const [animals, setAnimals] = React.useState([]);
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        fetch("/animals.json")
            .then(response => response.json())
            .then(data => setAnimals(data));

        const savedUser = localStorage.getItem("currentUser");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    function login(e) {
        e.preventDefault();

        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const found = users.find(
            u => u.email === email && u.password === password
        );

        if (found) {
            const currentUser = {
                name: found.name,
                surname: found.surname,
                email: found.email
            };

            localStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
            );

            setUser(currentUser);
            setLoginOpen(false);
            setPassword("");
            setEmail("");
        } else {
            alert("Неверный e-mail или пароль!");
        }
    }

    function logout() {
        localStorage.removeItem("currentUser");
        setUser(null);
    }

    return (
        <>
            <Head>
                <title>Petto</title>
                <meta
                    name="description"
                    content="Социальная сеть для владельцев животных"
                />
            </Head>

            <main style={{
                maxWidth: "900px",
                margin: "30px auto",
                textAlign: "center",
                fontFamily: "Arial"
            }}>
                <h1>Petto</h1>
                <h2>Поиск потерянных животных</h2>

                {/* Авторизация */}
                {user ? (
                    <div>
                        <p>
                            Вы вошли как {user.name} {user.surname}
                        </p>
                        <button onClick={logout}>Выйти</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setLoginOpen(true)}>
                            Войти
                        </button>
                        <p>
                            <a href="/register">Регистрация</a>
                        </p>
                    </div>
                )}

                {/* Слайдер животных */}
                {animals.length > 0 ? (
                    <AwesomeSlider style={{
                        "--slider-height-percentage": "70%"
                    }}>
                        {animals.map((animal, index) => (
                            <div
                                key={index}
                                onClick={() => sendEmail(animal.email, user, animal.header)}
                                style={{
                                    cursor: "pointer",
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <img
                                    src={animal.img}
                                    alt={animal.header}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />

                                <div style={{
                                    position: "absolute",
                                    bottom: "20px",
                                    left: "20px",
                                    right: "20px",
                                    background: "rgba(0,0,0,0.7)",
                                    color: "white",
                                    padding: "15px",
                                    borderRadius: "8px"
                                }}>
                                    <h2>{animal.header}</h2>
                                    <p>{animal.content}</p>
                                    <p>Нажмите, чтобы связаться с владельцем</p>
                                </div>
                            </div>
                        ))}
                    </AwesomeSlider>
                ) : (
                    <p>Загрузка объявлений...</p>
                )}

                <footer style={{ marginTop: "40px" }}>
                    Petto © 2026
                </footer>
            </main>

            {/* Модальное окно авторизации */}
            {loginOpen && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000
                }}>
                    <form onSubmit={login} style={{
                        background: "white",
                        padding: "30px",
                        borderRadius: "10px",
                        display: "grid",
                        gap: "15px",
                        width: "300px",
                        textAlign: "center"
                    }}>
                        <h2>Вход в Petto</h2>

                        <input
                            type="email"
                            placeholder="E-mail"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button type="submit">Войти</button>

                        <button
                            type="button"
                            onClick={() => setLoginOpen(false)}
                        >
                            Отмена
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
