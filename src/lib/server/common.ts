import playwright from 'playwright';

console.log('Launchging playwright');
export const pw = await playwright['webkit'].launch();
