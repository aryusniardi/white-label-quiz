import os, glob
from PIL import Image

def remove_background(png_path):
    img = Image.open(png_path).convert('RGBA')
    width, height = img.size
    
    # Check corners to get background color
    bg_r, bg_g, bg_b, _ = img.getpixel((5, 5))
    
    pixels = img.load()
    # BFS or color distance check from corners
    # Since background is very uniform solid color:
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If color is close to corner background color (euclidean distance < 35)
            dist = ((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)**0.5
            if dist < 28:
                pixels[x, y] = (0, 0, 0, 0)
                
    img.save(png_path, format='PNG')
    print(f"Processed: {png_path}")

if __name__ == '__main__':
    for path in glob.glob('/home/ubuntu/white-label-quiz/public/images/pixel/scene_*.png'):
        remove_background(path)
