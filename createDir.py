import os
import shutil

def create_door_structure(base_path, colors_source_dir, doors_source_dir, colored_doors_dir):
    """
    Creates directory structure and copies images from existing sources
    
    base_path: Root directory where final structure will be created
    colors_source_dir: Directory containing color sample images
    doors_source_dir: Directory containing base door images
    colored_doors_dir: Directory containing folders of colored door images
    """
    try:
        # Create base directory
        os.makedirs(base_path, exist_ok=True)
        
        # Get list of base doors
        base_doors = [f.split('.')[0] for f in os.listdir(doors_source_dir) 
                     if f.endswith(('.jpg', '.png', '.jpeg'))]
        
        # Get list of color codes from colors directory
        color_codes = [f.split('.')[0] for f in os.listdir(colors_source_dir) 
                      if f.endswith(('.jpg', '.png', '.jpeg'))]
        
        print(f"Found {len(base_doors)} doors and {len(color_codes)} colors")
        
        for door in base_doors:
            door_path = os.path.join(base_path, door)
            os.makedirs(door_path, exist_ok=True)
            
            # Copy main door image
            for ext in ['.jpg', '.png', '.jpeg']:
                source_door_image = os.path.join(doors_source_dir, f"{door}{ext}")
                if os.path.exists(source_door_image):
                    shutil.copy2(source_door_image, os.path.join(door_path, "main.jpg"))
                    print(f"Copied main image for: {door}")
                    break
            
            # Create colors directory
            colors_path = os.path.join(door_path, "colors")
            os.makedirs(colors_path, exist_ok=True)
            
            # Check if colored door directory exists
            colored_door_dir = os.path.join(colored_doors_dir, door)
            
            # Process each color
            for color in color_codes:
                color_path = os.path.join(colors_path, color)
                os.makedirs(color_path, exist_ok=True)
                
                # Copy color sample image
                for ext in ['.jpg', '.png', '.jpeg']:
                    source_color_image = os.path.join(colors_source_dir, f"{color}{ext}")
                    if os.path.exists(source_color_image):
                        shutil.copy2(source_color_image, 
                                   os.path.join(color_path, "sample.jpg"))
                        print(f"Copied color sample for {door} - {color}")
                        break
                
                # Try to copy colored door image if directory exists
                if os.path.exists(colored_door_dir):
                    # Check for color image with different possible extensions
                    for ext in ['.jpg', '.png', '.jpeg']:
                        colored_door_image = os.path.join(colored_door_dir, f"{color}{ext}")
                        if os.path.exists(colored_door_image):
                            shutil.copy2(colored_door_image, 
                                       os.path.join(color_path, "door.jpg"))
                            print(f"Copied colored door image for {door} - {color}")
                            break
                    else:
                        print(f"Note: No colored door image for {door} - {color}")
                
    except Exception as e:
        print(f"Error in processing: {str(e)}")

# Directory paths
COLORS_DIR = "./colors"  # Directory with color samples
DOORS_DIR = "./doors"    # Directory with base door images
COLORED_DOORS_DIR = "./colored_doors"  # Directory containing folders of colored doors
OUTPUT_DIR = "./final_doors_data"

# Create the structure
create_door_structure(
    OUTPUT_DIR,
    COLORS_DIR,
    DOORS_DIR,
    COLORED_DOORS_DIR
)