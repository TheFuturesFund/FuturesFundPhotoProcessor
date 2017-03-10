# Futures Fund Photo Processor

This app serves as a micro-service to process images that are uploaded to the Futures Fund's photography web application.

Metadata related to the images is read off of an SQS queue, and corresponding images are downloaded from S3. Once the images are downloaded, they are resized and re-uploaded. After re-uploading the images, an HTTP endpoint on the web application is touched to tell the application to point to the processed images instead of the originals.
