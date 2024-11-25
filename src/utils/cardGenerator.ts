export const generateNoteImage = (note: {
  content: string;
  color: string;
  createdAt: Date;
}): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size (flash card dimensions)
    canvas.width = 800;
    canvas.height = 400;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f9fafb'); // gray-50
    gradient.addColorStop(1, '#f3f4f6'); // gray-100
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw card background with same opacity as in UI
    ctx.fillStyle = note.color + '40'; // Same opacity as in the UI
    ctx.fillRect(24, 24, canvas.width - 48, canvas.height - 48);
    
    // Add subtle shadow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    
    // Add rounded corners
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(24 + radius, 24);
    ctx.lineTo(canvas.width - 24 - radius, 24);
    ctx.quadraticCurveTo(canvas.width - 24, 24, canvas.width - 24, 24 + radius);
    ctx.lineTo(canvas.width - 24, canvas.height - 24 - radius);
    ctx.quadraticCurveTo(canvas.width - 24, canvas.height - 24, canvas.width - 24 - radius, canvas.height - 24);
    ctx.lineTo(24 + radius, canvas.height - 24);
    ctx.quadraticCurveTo(24, canvas.height - 24, 24, canvas.height - 24 - radius);
    ctx.lineTo(24, 24 + radius);
    ctx.quadraticCurveTo(24, 24, 24 + radius, 24);
    ctx.closePath();
    ctx.clip();
    
    // Reset shadow for text
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Configure text
    ctx.fillStyle = '#1f2937'; // text-gray-800
    ctx.font = '24px Inter, system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    
    // Word wrap function
    const wrapText = (text: string, maxWidth: number) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    // Draw wrapped text
    const lines = wrapText(note.content, canvas.width - 96); // 48px padding on each side
    const lineHeight = 36;
    const totalTextHeight = lines.length * lineHeight;
    let startY = (canvas.height - totalTextHeight) / 2;

    lines.forEach((line) => {
      ctx.fillText(line, 48, startY);
      startY += lineHeight;
    });

    // Add date at the bottom
    ctx.font = '14px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280'; // text-gray-500
    const date = new Date(note.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    ctx.fillText(date, 48, canvas.height - 48);

    // Convert to image
    resolve(canvas.toDataURL('image/png'));
  });
};