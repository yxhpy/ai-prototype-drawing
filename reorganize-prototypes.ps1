# 重组原型组件目录结构脚本
# 按项目将原型组件分类到不同子目录

# 创建项目目录
$projectDirs = @(
    "video-generation",
    "user-auth"  # 可以根据需要添加更多项目
)

foreach ($dir in $projectDirs) {
    $path = "src/components/prototypes/$dir"
    if (-not (Test-Path $path)) {
        Write-Host "Creating directory: $path"
        New-Item -Path $path -ItemType Directory -Force | Out-Null
    }
}

# 定义每个项目包含的组件
$videoGenerationComponents = @(
    "ScriptGenerationPage.tsx",
    "ResourceListPage.tsx",
    "ResourceUploadPage.tsx",
    "VoiceoverMatchingPage.tsx",
    "MusicListPage.tsx",
    "MusicUploadPage.tsx",
    "TransitionEffectsPage.tsx",
    "VideoGenerationPage.tsx"
)

$userAuthComponents = @(
    "LoginPage.tsx",
    "RegisterPage.tsx"
)

$productComponents = @(
    "ProductListPage.tsx"
)

# 移动视频生成项目组件
Write-Host "Moving video generation components..."
foreach ($component in $videoGenerationComponents) {
    $sourcePath = "src/components/prototypes/$component"
    $destPath = "src/components/prototypes/video-generation/$component"
    
    if (Test-Path $sourcePath) {
        Write-Host "Moving $component to video-generation directory"
        Move-Item -Path $sourcePath -Destination $destPath -Force
    } else {
        Write-Host "File does not exist: $sourcePath"
    }
}

# 移动用户认证项目组件
Write-Host "Moving user auth components..."
if (-not (Test-Path "src/components/prototypes/user-auth")) {
    New-Item -Path "src/components/prototypes/user-auth" -ItemType Directory -Force | Out-Null
}

foreach ($component in $userAuthComponents) {
    $sourcePath = "src/components/prototypes/$component"
    $destPath = "src/components/prototypes/user-auth/$component"
    
    if (Test-Path $sourcePath) {
        Write-Host "Moving $component to user-auth directory"
        Move-Item -Path $sourcePath -Destination $destPath -Force
    } else {
        Write-Host "File does not exist: $sourcePath"
    }
}

# 移动产品相关组件
Write-Host "Moving product components..."
if (-not (Test-Path "src/components/prototypes/product")) {
    New-Item -Path "src/components/prototypes/product" -ItemType Directory -Force | Out-Null
}

foreach ($component in $productComponents) {
    $sourcePath = "src/components/prototypes/$component"
    $destPath = "src/components/prototypes/product/$component"
    
    if (Test-Path $sourcePath) {
        Write-Host "Moving $component to product directory"
        Move-Item -Path $sourcePath -Destination $destPath -Force
    } else {
        Write-Host "File does not exist: $sourcePath"
    }
}

Write-Host "Prototype components reorganization completed!" 