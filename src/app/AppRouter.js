import React from "react";
import { Route, Routes } from "react-router-dom";
import UserContent from "../fetures/User/UserList/UserContent";
import LoginContent from "../fetures/Login/LoginContent";
import Global from "../layouts/Global";
import Private from "../layouts/Private";
import HomeContent from "../fetures/Home/HomeContent";
import HabitContent from "../fetures/Habit/HabitList/HabitContent";
import HabitCreateContent from "../fetures/Habit/HabitCreate/HabitCreateContent";
import HabitEditContent from "../fetures/Habit/HabitEdit/HabitEditContent";
import UserCreateContent from "../fetures/User/UserCreate/UserCreateContent";
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Global />}>
        <Route element={<LoginContent />} path="/" />
      </Route>
      <Route element={<Private />}>
        <Route element={<HomeContent />} path="/home" />

        <Route element={<UserContent />} path="/home/user" />
        <Route element={<UserCreateContent />} path="/home/user/create" />
        <Route element={<HabitContent />} path="/home/habit" />
        <Route element={<HabitCreateContent />} path="/home/habit/create" />
        <Route element={<HabitEditContent />} path="/home/habit/edit/:id" />
      </Route>
    </Routes>
  );
}
