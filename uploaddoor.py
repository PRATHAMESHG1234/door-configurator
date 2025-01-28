from firebase_admin import credentials, initialize_app, storage, firestore
import os
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm

# Initialize Firebase
cred = credentials.Certificate('./firebase-key.json')
app = initialize_app(cred, {
    'projectId': 'codegen-mailer',
    'storageBucket': 'codegen-mailer.appspot.com'
})

# Initialize Firestore
db = firestore.client(app)
bucket = storage.bucket(app=app)

def upload_image(blob_path, file_path):
    try:
        blob = bucket.blob(blob_path)
        blob.upload_from_filename(file_path)
        blob.make_public()
        return blob.public_url
    except Exception as e:
        print(f"Error uploading {file_path}: {str(e)}")
        return None

def process_door(base_folder, door_name):
    try:
        door_path = os.path.join(base_folder, door_name)
        
        # Create basic door data
        door_data = {
            'name': door_name,
            'description': f'Description for {door_name}',  # You can modify this as needed
            'color_variants': {}
        }

        # Upload main door image
        main_image_path = os.path.join(door_path, "main.jpg")
        if os.path.exists(main_image_path):
            main_url = upload_image(f'doors/{door_name}/main.jpg', main_image_path)
            door_data['main_image_url'] = main_url

        # Process colors
        colors_path = os.path.join(door_path, "colors")
        if os.path.exists(colors_path):
            for color in os.listdir(colors_path):
                color_path = os.path.join(colors_path, color)
                if os.path.isdir(color_path):
                    sample_path = os.path.join(color_path, "sample.jpg")
                    door_color_path = os.path.join(color_path, "door.jpg")
                    
                    # Only process if both images exist
                    if os.path.exists(sample_path) and os.path.exists(door_color_path):
                        sample_url = upload_image(
                            f'doors/{door_name}/colors/{color}/sample.jpg',
                            sample_path
                        )
                        door_url = upload_image(
                            f'doors/{door_name}/colors/{color}/door.jpg',
                            door_color_path
                        )
                        
                        if sample_url and door_url:
                            door_data['color_variants'][color] = {
                                'sample_image_url': sample_url,
                                'door_image_url': door_url
                            }

        door_data['available_colors'] = list(door_data['color_variants'].keys())
        
        # Upload to Firestore
        db.collection('doors').document(door_name).set(door_data)
        print(f"Successfully uploaded {door_name} with {len(door_data['available_colors'])} colors")
        return True
    except Exception as e:
        print(f"Error processing {door_name}: {str(e)}")
        return False

def bulk_upload_doors(base_folder, max_workers=5):
    # Get list of all doors in the base folder
    doors = [d for d in os.listdir(base_folder) 
            if os.path.isdir(os.path.join(base_folder, d))]
    
    print(f"Found {len(doors)} doors to process")
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = []
        for door in doors:
            futures.append(
                executor.submit(process_door, base_folder, door)
            )
        
        success = 0
        for future in tqdm(futures, desc="Uploading doors"):
            if future.result():
                success += 1
                
        print(f"Successfully uploaded {success}/{len(doors)} doors")

# Usage
base_folder = "./final_doors_data"  # Your directory with the prepared structure
bulk_upload_doors(base_folder)