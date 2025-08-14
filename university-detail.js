// ===== 大学详细信息页面 JavaScript 功能 =====

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('大学详细信息页面已加载');
    
    // 初始化页面
    initializePage();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 加载大学数据
    loadUniversityData();
});

// ===== 页面初始化函数 =====
function initializePage() {
    console.log('正在初始化页面...');
    
    // 检查URL参数，获取要显示的大学名称
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (universityName) {
        console.log('从URL获取到大学名称:', universityName);
        // 这里可以设置页面标题
        document.title = `${universityName} - University Details`;
    } else {
        console.log('未找到大学名称参数，使用默认数据');
        // 如果没有参数，可以显示默认的大学信息
        showDefaultUniversity();
    }
}

// ===== 绑定事件监听器 =====
function bindEventListeners() {
    console.log('正在绑定事件监听器...');
    
    // 返回按钮点击事件
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('用户点击了返回按钮');
            // 返回到大学列表页面
            window.location.href = 'List.html';
        });
    }
    
    // 收藏按钮点击事件
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            console.log('用户点击了收藏按钮');
            toggleFavorite();
        });
    }
    
    // 对比按钮点击事件
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            console.log('用户点击了对比按钮');
            addToComparison();
        });
    }
    
    // 申请按钮点击事件
    const applyBtn = document.getElementById('applyBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            console.log('用户点击了申请按钮');
            handleApplication();
        });
    }
    
    // 联系按钮点击事件
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            console.log('用户点击了联系按钮');
            handleContact();
        });
    }
    
    // 预约按钮点击事件
    const scheduleBtn = document.getElementById('scheduleBtn');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            console.log('用户点击了预约按钮');
            handleSchedule();
        });
    }
}

// ===== 加载大学数据 =====
function loadUniversityData() {
    console.log('正在加载大学数据...');
    
    // 从URL获取大学名称
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (!universityName) {
        console.log('未找到大学名称，显示默认数据');
        showDefaultUniversity();
        return;
    }
    
    // 从本地JSON文件加载大学数据
    fetch('UniList.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载大学数据');
            }
            return response.json();
        })
        .then(data => {
            console.log('成功加载大学数据:', data);
            // 查找指定的大学
            const university = data.find(uni => uni.University === universityName);
            
            if (university) {
                console.log('找到大学信息:', university);
                displayUniversityData(university);
            } else {
                console.log('未找到大学信息:', universityName);
                showUniversityNotFound(universityName);
            }
        })
        .catch(error => {
            console.error('加载大学数据时出错:', error);
            showError('Failed to load university data. Please try again later.');
        });
}

// ===== 显示大学数据 =====
function displayUniversityData(university) {
    console.log('正在显示大学数据:', university);
    
    // 更新大学名称
    const nameElement = document.getElementById('universityName');
    if (nameElement) {
        nameElement.textContent = university.University;
    }
    
    // 更新排名
    const rankElement = document.getElementById('universityRank');
    if (rankElement) {
        rankElement.textContent = university.Rank;
    }
    
    // 更新位置
    const locationElement = document.getElementById('universityLocation');
    if (locationElement) {
        locationElement.textContent = university.Location;
    }
    
    // 更新费用信息
    updateCostsDisplay(university);
    
    // 更新合作项目信息
    updateCoopDisplay(university);
    
    // 更新校园设施信息
    updateFacilitiesDisplay(university);
    
    // 更新地理位置信息
    updateLocationDisplay(university);
    
    // 计算并显示总费用
    calculateTotalCost(university);
    
    console.log('大学数据更新完成');
}

// ===== 更新费用显示 =====
function updateCostsDisplay(university) {
    console.log('正在更新费用显示...');
    
    // 更新学费
    const tuitionElement = document.getElementById('tuitionCost');
    if (tuitionElement) {
        tuitionElement.textContent = formatCurrency(university.Tuition);
    }
    
    // 更新生活费
    const livingElement = document.getElementById('livingCost');
    if (livingElement) {
        livingElement.textContent = formatCurrency(university.Living);
    }
    
    // 更新额外费用
    const extraElement = document.getElementById('extraCost');
    if (extraElement) {
        extraElement.textContent = formatCurrency(university.Extra);
    }
}

// ===== 更新合作项目显示 =====
function updateCoopDisplay(university) {
    console.log('正在更新合作项目显示...');
    
    const coopLevelElement = document.getElementById('coopLevel');
    if (coopLevelElement) {
        // 更新合作项目级别
        const levelBadge = coopLevelElement.querySelector('.level-badge');
        if (levelBadge) {
            levelBadge.textContent = university.Co_op;
        }
        
        // 更新合作项目描述
        const descriptionElement = coopLevelElement.querySelector('.level-description');
        if (descriptionElement) {
            descriptionElement.textContent = getCoopDescription(university.Co_op);
        }
    }
}

// ===== 获取合作项目描述 =====
function getCoopDescription(coopLevel) {
    const descriptions = {
        'Extensive': 'Comprehensive co-op program with multiple work terms and strong industry connections.',
        'Mid': 'Moderate co-op opportunities with some work experience options.',
        'Limited': 'Basic co-op program with limited work term options.'
    };
    
    return descriptions[coopLevel] || 'Co-op program information available upon request.';
}

// ===== 更新校园设施显示 =====
function updateFacilitiesDisplay(university) {
    console.log('正在更新校园设施显示...');
    
    const foodFacilityElement = document.getElementById('foodFacility');
    if (foodFacilityElement) {
        const statusElement = foodFacilityElement.querySelector('.facility-status');
        if (statusElement) {
            if (university.Food) {
                statusElement.textContent = 'Available';
                statusElement.style.backgroundColor = 'var(--apple-green)';
            } else {
                statusElement.textContent = 'Not Available';
                statusElement.style.backgroundColor = 'var(--apple-red)';
            }
        }
    }
}

// ===== 更新地理位置显示 =====
function updateLocationDisplay(university) {
    console.log('正在更新地理位置显示...');
    
    const provinceElement = document.getElementById('province');
    if (provinceElement) {
        provinceElement.textContent = university.Location;
    }
}

// ===== 计算总费用 =====
function calculateTotalCost(university) {
    console.log('正在计算总费用...');
    
    // 计算年度总费用：学费 + (生活费 × 12) + 额外费用
    const annualLivingCost = university.Living * 12;
    const totalCost = university.Tuition + annualLivingCost + university.Extra;
    
    console.log('费用计算:', {
        tuition: university.Tuition,
        annualLiving: annualLivingCost,
        extra: university.Extra,
        total: totalCost
    });
    
    // 更新总费用显示
    const totalElement = document.getElementById('totalCost');
    if (totalElement) {
        totalElement.textContent = formatCurrency(totalCost);
    }
}

// ===== 格式化货币显示 =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ===== 显示默认大学信息 =====
function showDefaultUniversity() {
    console.log('显示默认大学信息');
    
    // 这里可以显示一个示例大学或者提示用户选择大学
    const defaultData = {
        University: "Select a University",
        Rank: "N/A",
        Location: "N/A",
        Tuition: 0,
        Living: 0,
        Extra: 0,
        Co_op: "N/A",
        Food: false
    };
    
    displayUniversityData(defaultData);
}

// ===== 显示大学未找到信息 =====
function showUniversityNotFound(universityName) {
    console.log('大学未找到:', universityName);
    
    // 显示错误信息
    showError(`University "${universityName}" not found. Please check the university name and try again.`);
    
    // 显示默认信息
    showDefaultUniversity();
}

// ===== 显示错误信息 =====
function showError(message) {
    console.error('显示错误信息:', message);
    
    // 创建错误提示元素
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background-color: var(--apple-red);
        color: white;
        padding: var(--spacing-md);
        border-radius: var(--radius-medium);
        margin: var(--spacing-md);
        text-align: center;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    // 插入到页面顶部
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(errorDiv, mainContent.firstChild);
        
        // 3秒后自动移除错误信息
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
}

// ===== 收藏功能 =====
function toggleFavorite() {
    console.log('切换收藏状态');
    
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        const isFavorited = favoriteBtn.classList.contains('favorited');
        
        if (isFavorited) {
            // 取消收藏
            favoriteBtn.classList.remove('favorited');
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
            favoriteBtn.style.backgroundColor = 'var(--apple-blue)';
            showNotification('Removed from favorites');
        } else {
            // 添加收藏
            favoriteBtn.classList.add('favorited');
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
            favoriteBtn.style.backgroundColor = 'var(--apple-red)';
            showNotification('Added to favorites');
        }
    }
}

// ===== 添加到对比 =====
function addToComparison() {
    console.log('添加到对比列表');
    
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (universityName) {
        // 这里可以实现对比功能，比如存储到localStorage
        const comparisonList = JSON.parse(localStorage.getItem('universityComparison') || '[]');
        
        if (!comparisonList.includes(universityName)) {
            comparisonList.push(universityName);
            localStorage.setItem('universityComparison', JSON.stringify(comparisonList));
            showNotification('Added to comparison list');
        } else {
            showNotification('Already in comparison list');
        }
    }
}

// ===== 处理申请 =====
function handleApplication() {
    console.log('处理大学申请');
    
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (universityName) {
        // 这里可以实现申请功能，比如跳转到申请页面
        showNotification('Redirecting to application page...');
        
        // 模拟跳转延迟
        setTimeout(() => {
            // 这里可以跳转到实际的申请页面
            alert(`You will be redirected to apply for ${universityName}`);
        }, 1000);
    }
}

// ===== 处理联系 =====
function handleContact() {
    console.log('处理联系请求');
    
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (universityName) {
        // 显示联系信息
        const contactInfo = `
Contact Information for ${universityName}:

📧 Email: admissions@${universityName.toLowerCase().replace(/\s+/g, '')}.edu
📞 Phone: +1 (555) 123-4567
🌐 Website: www.${universityName.toLowerCase().replace(/\s+/g, '')}.edu

Office Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
        `;
        
        alert(contactInfo);
    }
}

// ===== 处理预约 =====
function handleSchedule() {
    console.log('处理预约请求');
    
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (universityName) {
        // 显示预约信息
        const scheduleInfo = `
Campus Visit Scheduling for ${universityName}:

📅 Available Days: Monday - Friday
⏰ Time Slots: 10:00 AM, 2:00 PM
📍 Meeting Point: Main Campus Welcome Center

To schedule a visit, please contact:
📧 visits@${universityName.toLowerCase().replace(/\s+/g, '')}.edu
📞 +1 (555) 987-6543

Please book at least 2 weeks in advance.
        `;
        
        alert(scheduleInfo);
    }
}

// ===== 显示通知 =====
function showNotification(message) {
    console.log('显示通知:', message);
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--apple-green);
        color: white;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-medium);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// ===== 页面加载完成后的额外初始化 =====
window.addEventListener('load', function() {
    console.log('页面完全加载完成');
    
    // 检查收藏状态
    checkFavoriteStatus();
    
    // 添加页面加载动画
    addPageLoadAnimation();
});

// ===== 检查收藏状态 =====
function checkFavoriteStatus() {
    console.log('检查收藏状态');
    
    const urlParams = new URLSearchParams(window.location.search);
    const universityName = urlParams.get('university');
    
    if (universityName) {
        // 从localStorage检查是否已收藏
        const favorites = JSON.parse(localStorage.getItem('universityFavorites') || '[]');
        const isFavorited = favorites.includes(universityName);
        
        if (isFavorited) {
            const favoriteBtn = document.getElementById('favoriteBtn');
            if (favoriteBtn) {
                favoriteBtn.classList.add('favorited');
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
                favoriteBtn.style.backgroundColor = 'var(--apple-red)';
            }
        }
    }
}

// ===== 添加页面加载动画 =====
function addPageLoadAnimation() {
    console.log('添加页面加载动画');
    
    // 为页面元素添加淡入动画
    const animatedElements = document.querySelectorAll('.cost-card, .detail-section');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== 导出函数供其他模块使用 =====
window.UniversityDetail = {
    loadUniversityData,
    displayUniversityData,
    toggleFavorite,
    addToComparison,
    handleApplication,
    handleContact,
    handleSchedule
};