## 🎓 Bunk Manager

A robust, minimalist web application designed for engineering students to track class attendance and calculate safe bunking limits. Built with a "Dark & Serious" aesthetic tailored for late-night study sessions.

## 🚀 Live Demo
  https://sanchita-inloop.github.io/Bunk-Manager/

## ✨ Features
  Dynamic Target Setting: Set custom attendance targets (e.g., 75%, 60%, 50%) for individual subjects.
  Smart Logic Engine:
        1. Calculates exactly how many classes you can safely skip.
        2. Calculates exactly how many classes you MUST attend to recover your attendance.
  Persistent Data: Uses `localStorage` to save your data. Your attendance record survives browser refreshes and restarts.
  Dark Mode UI: A deep slate/navy theme designed to reduce eye strain.
  Mobile Responsive: Layout adapts perfectly to mobile screens for quick updates on the go.

## 🛠️ Tech Stack

  Frontend: HTML5, CSS3 (Custom Variables & Flexbox/Grid)
  Logic: Vanilla JavaScript (ES6+)
  Storage: Browser Local Storage API

## The Logic (Algorithm)

The application uses an O(1) mathematical formula to determine your status instantly:

  1. If Current % > Target % (Safe)
  2. If Current % < Target % (Danger)

## 📸 Screenshots
  

- Built with ❤️ (and a fear of 75% attendance) by Sanchita
