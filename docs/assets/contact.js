// 联系邮箱旁的复制图标：仅在用户点击后写入公开邮箱，不读取剪贴板，也不发送网络请求。
// 无脚本时复制图标保持隐藏，邮箱仍是普通邮件链接。
document.querySelectorAll('[data-email-contact]').forEach((contact) => {
    const address = contact.querySelector('[data-email-address]')?.textContent.trim();
    const button = contact.querySelector('[data-copy-email]');
    const status = contact.querySelector('[data-email-status]');
    if (!address || !button || !status) return;

    const idleLabel = button.getAttribute('aria-label');
    let resetTimer = 0;

    /** 复制成功时图标短暂变为对勾，并向读屏软件播报一次。 */
    const markCopied = () => {
        window.clearTimeout(resetTimer);
        button.classList.add('is-copied');
        button.setAttribute('aria-label', '已复制邮箱');
        status.textContent = '已复制邮箱';
        resetTimer = window.setTimeout(() => {
            button.classList.remove('is-copied');
            button.setAttribute('aria-label', idleLabel);
            status.textContent = '';
        }, 1600);
    };

    button.hidden = false;
    button.addEventListener('click', async () => {
        try {
            // 个别环境的权限请求可能一直不返回；超时按失败处理。
            await Promise.race([
                navigator.clipboard.writeText(address),
                new Promise((_, reject) => window.setTimeout(() => reject(new Error('timeout')), 2000)),
            ]);
            markCopied();
        } catch {
            // 无法自动复制时选中地址，交给用户手动复制；不提示成功。
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(contact.querySelector('[data-email-address]'));
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    });
});
