import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Regular': require('./Poppins-Regular.ttf'),
        'Poppins-Bold': require('./Poppins-Bold.ttf'),
        // Add more font styles (e.g., italic, bold italic) if needed
    });
};
