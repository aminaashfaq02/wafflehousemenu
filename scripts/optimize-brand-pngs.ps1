Add-Type -AssemblyName System.Drawing

function Optimize-Png($path, $maxDim) {
    if (-not (Test-Path $path)) { return }
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    
    $w = $bmp.Width
    $h = $bmp.Height
    
    if ($w -gt $maxDim -or $h -gt $maxDim) {
        $scale = [Math]::Min($maxDim / $w, $maxDim / $h)
        $newW = [int]($w * $scale)
        $newH = [int]($h * $scale)
    } else {
        $newW = $w
        $newH = $h
    }
    
    $outBmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($outBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($bmp, 0, 0, $newW, $newH)
    $g.Dispose()
    $bmp.Dispose()
    
    $tempPath = $path + ".tmp.png"
    $outBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    
    Move-Item -Force $tempPath $path
    $len = (Get-Item $path).Length
    Write-Host "Optimized $path to $len bytes ($($newW)x$($newH))"
}

Optimize-Png "assets\logo.png" 480
Optimize-Png "assets\waffle-house-logo.png" 480
Optimize-Png "assets\logo-icon.png" 256
Optimize-Png "assets\waffle-icon-512.png" 256
