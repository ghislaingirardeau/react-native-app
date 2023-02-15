# npx expo start --dev-client

ouvrir expo sur mobile et faire
Scanner le code pour faire tourner l'app et le package fonctionne !

- INSTALLATION

# intall react native basiques

npm create-expo-app MyNativeApp = init the react native project with expo and name project
npm install expo = to let use the expo components TEST1

install web & webview to preview in the browser TEST

# Navigation et routes

npm install @react-navigation/native @react-navigation/native-stack = install the router
https://reactnative.dev/docs/navigation#react-navigation

# intall colors

https://coolors.co/palette/ef476f-ffd166-06d6a0-118ab2-073b4c

# intall font

npx expo install expo-font @expo-google-fonts/inter
Creer un composant juste pour le texte afin de le personnalisé pour tout le document
car on ne peut implementer un css a tout le document

# react-native voice

ne peut pas etre utilisé avec expo go car it requires custom native code.
il faut ajouter le system eas build
https://docs.expo.dev/workflow/customizing/

besoin de souscrire le projet sur expo dashboard

video tuto dispo :
https://www.youtube.com/watch?v=gpXF9heaw8k

Pour creer le lien avec le build:
https://docs.expo.dev/development/create-development-builds/

Flasher le qr code avec un scan pour avoir le lien et installer app
click sur install, open .apk

lance le projet : npx expo start --dev-client
scan le qr code dans expo go
