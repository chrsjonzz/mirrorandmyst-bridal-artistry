import pdfplumber

pdf_files = [
    r"C:\Users\Administrator\Downloads\Essential Makeup Tools & Brush Utilisation, Sarah Baldwin.pdf",
    r"C:\Users\Administrator\Downloads\01. Make up Application author Various authors.pdf",
    r"C:\Users\Administrator\Downloads\Makeup Guide, Rocky Mountain Bride.pdf",
    r"C:\Users\Administrator\Downloads\03. Basic Full-Face Makeup Application author Various authors.pdf",
    r"C:\Users\Administrator\Downloads\16. Basic Eyeshadow author Robert Jones Beauty Academy Online Makeup School.pdf",
    r"C:\Users\Administrator\Downloads\05. 5 Secrets to Prepping Your Skin for Flawless Makeup author Various authors.pdf",
    r"C:\Users\Administrator\Downloads\02. Bare to Brilliant in Thirty Minutes author Kylie Hensley.pdf",
    r"C:\Users\Administrator\Downloads\12. A Photographer’s Guide to Makeup author Various authors.pdf",
    r"C:\Users\Administrator\Downloads\PH_Eng_-Professional-Makeup-Artist-BWSQ-0306_Version-2.0-1-20.pdf"
]

output_txts = [
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\essential_makeup_tools.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\makeup_application.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\rocky_mountain_bride.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\full_face_makeup.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\basic_eyeshadow.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\skin_prep_secrets.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\bare_to_brilliant.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\photographers_guide.txt",
    r"C:\Users\Administrator\CascadeProjects\mirrorandmyst-bridal-artistry\pdf_tips\pro_mua_bwsq.txt"
]

for pdf_path, txt_path in zip(pdf_files, output_txts):
    with pdfplumber.open(pdf_path) as pdf:
        all_text = "\n".join(page.extract_text() or "" for page in pdf.pages)
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(all_text)

print("All PDFs extracted to text files!")
