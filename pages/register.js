
import React, { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        if (users.some(user => user.email === form.email)) {
            alert("Пользователь уже зарегистрирован!");
            return;
        }

        users.push(form);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Регистрация успешна!");
        window.location.href = "/";
    }

    return (
        <main style={{
            maxWidth: "400px",
            margin: "50px auto",
            fontFamily: "Arial",
            textAlign: "center"
        }}>
            <h1>Регистрация Petto</h1>

            <form onSubmit={handleSubmit}
                  style={{ display: "grid", gap: "15px" }}>

                <input
                    placeholder="Имя"
                    required
                    value={form.name}
                    onChange={e =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Фамилия"
                    required
                    value={form.surname}
                    onChange={e =>
                        setForm({ ...form, surname: e.target.value })
                    }
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    required
                    value={form.email}
                    onChange={e =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    required
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button type="submit">Зарегистрироваться</button>
            </form>

            <p><a href="/">Вернуться на главную</a></p>
        </main>
    );
}
