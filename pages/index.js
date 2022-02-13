import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React from "react";
import CompleteTodo from "../components/CompleteTodo";
import ProgressTodo from "../components/ProgressTodo";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Todo</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.menu}>
                <ProgressTodo/>
                <CompleteTodo/>
            </div>
        </div>
    )
}

