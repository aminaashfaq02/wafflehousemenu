Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Waseem Computer Nwl\.gemini\antigravity\brain\63b3484f-8756-46fc-a3d6-a037c53d6bb2\.user_uploaded\media_1790835002855.jpg"
$baseImg = [System.Drawing.Bitmap]::FromFile($srcPath)

# 1. Full Logo (cropped from Y=35 to Y=955, X=15 to X=667)
$fullCropX = 15
$fullCropY = 35
$fullCropW = 652
$fullCropH = 920

$fullBmp = New-Object System.Drawing.Bitmap($fullCropW, $fullCropH)
$gFull = [System.Drawing.Graphics]::FromImage($fullBmp)
$gFull.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFull.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gFull.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gFull.DrawImage($baseImg, [System.Drawing.Rectangle]::new(0, 0, $fullCropW, $fullCropH), $fullCropX, $fullCropY, $fullCropW, $fullCropH, [System.Drawing.GraphicsUnit]::Pixel)
$gFull.Dispose()

$fullBmp.Save("assets\waffle-house-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fullBmp.Save("assets\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created assets\waffle-house-logo.png and assets\logo.png ($($fullCropW)x$($fullCropH))"
$fullBmp.Dispose()

# 2. Square Mascot Icon (The Chef + Waffles + Golden Circle)
# Center is x=341. Golden circle + waffles span from Y=38 to Y=628 (height 590). Width spans ~20 to ~662 (width 642).
# Let's create a 640x640 square crop centered at X=341, Y=333
$iconCropSize = 640
$iconCropX = [int](341 - ($iconCropSize / 2))
$iconCropY = 20

# If iconCropX < 0, shift
if ($iconCropX -lt 0) { $iconCropX = 0 }

$squareBmp = New-Object System.Drawing.Bitmap($iconCropSize, $iconCropSize)
$gSquare = [System.Drawing.Graphics]::FromImage($squareBmp)
$gSquare.Clear([System.Drawing.Color]::FromArgb(254, 251, 239))
$gSquare.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gSquare.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gSquare.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$gSquare.DrawImage($baseImg, [System.Drawing.Rectangle]::new(0, 0, $iconCropSize, $iconCropSize), $iconCropX, $iconCropY, $iconCropSize, $iconCropSize, [System.Drawing.GraphicsUnit]::Pixel)
$gSquare.Dispose()

function Resize-And-Save($srcBitmap, $size, $outPath) {
    $targetBmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($targetBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($srcBitmap, 0, 0, $size, $size)
    $g.Dispose()
    $targetBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $targetBmp.Dispose()
    Write-Host "Saved $outPath ($($size)x$($size))"
}

# Generate all favicon & app icon sizes
Resize-And-Save $squareBmp 512 "assets\logo-icon.png"
Resize-And-Save $squareBmp 512 "assets\waffle-icon-512.png"
Resize-And-Save $squareBmp 192 "assets\waffle-icon-192.png"
Resize-And-Save $squareBmp 180 "apple-touch-icon.png"
Resize-And-Save $squareBmp 180 "assets\apple-touch-icon.png"
Resize-And-Save $squareBmp 48 "assets\waffle-icon-48.png"
Resize-And-Save $squareBmp 48 "favicon-48x48.png"
Resize-And-Save $squareBmp 32 "assets\waffle-icon-32.png"
Resize-And-Save $squareBmp 32 "favicon-32x32.png"
Resize-And-Save $squareBmp 16 "assets\waffle-icon-16.png"
Resize-And-Save $squareBmp 16 "favicon-16x16.png"

# Now build multi-size favicon.ico (16, 32, 48) using binary icon format
$ico16 = New-Object System.Drawing.Bitmap(16, 16)
$g = [System.Drawing.Graphics]::FromImage($ico16)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($squareBmp, 0, 0, 16, 16)
$g.Dispose()

$ico32 = New-Object System.Drawing.Bitmap(32, 32)
$g = [System.Drawing.Graphics]::FromImage($ico32)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($squareBmp, 0, 0, 32, 32)
$g.Dispose()

$ico48 = New-Object System.Drawing.Bitmap(48, 48)
$g = [System.Drawing.Graphics]::FromImage($ico48)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($squareBmp, 0, 0, 48, 48)
$g.Dispose()

# Create .ico file using standard Icon structure
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)

# ICO header
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type 1 = ICO
$bw.Write([uint16]3) # 3 images: 16, 32, 48

$sizes = @(16, 32, 48)
$bmps = @($ico16, $ico32, $ico48)
$pngBytes = @()

foreach ($b in $bmps) {
    $tempMs = New-Object System.IO.MemoryStream
    $b.Save($tempMs, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngBytes += ,$tempMs.ToArray()
    $tempMs.Dispose()
}

$offset = 6 + (16 * 3) # Header + 3 directory entries

for ($i = 0; $i -lt 3; $i++) {
    $s = $sizes[$i]
    $data = $pngBytes[$i]
    $bw.Write([byte]($s % 256)) # Width
    $bw.Write([byte]($s % 256)) # Height
    $bw.Write([byte]0)          # Colors
    $bw.Write([byte]0)          # Reserved
    $bw.Write([uint16]1)        # Color planes
    $bw.Write([uint16]32)       # Bits per pixel
    $bw.Write([uint32]$data.Length) # Image data size
    $bw.Write([uint32]$offset)      # Image data offset
    $offset += $data.Length
}

for ($i = 0; $i -lt 3; $i++) {
    $bw.Write($pngBytes[$i])
}

[System.IO.File]::WriteAllBytes("favicon.ico", $ms.ToArray())
[System.IO.File]::WriteAllBytes("assets\favicon.ico", $ms.ToArray())
$ms.Dispose()
Write-Host "Created valid multi-resolution favicon.ico (16, 32, 48)!"

$ico16.Dispose()
$ico32.Dispose()
$ico48.Dispose()
$squareBmp.Dispose()
$baseImg.Dispose()
