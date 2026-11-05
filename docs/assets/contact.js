// 仅在用户操作后写入公开联系邮箱；不读取剪贴板，也不发送网络请求。
document.querySelectorAll('[data-email-contact]').forEach((contact) => {
    const link = contact.querySelector('[data-email-link]');
    const addressText = contact.querySelector('[data-email-address]');
    const copyButton = contact.querySelector('[data-copy-email]');
    const status = contact.querySelector('[data-email-status]');
    if (!link || !addressText || !copyButton || !status) return;

    const address = addressText.textContent.trim();
    let pending = false;
    let messageVersion = 0;

    copyButton.hidden = false;
    status.textContent = '点击邮箱打开邮件应用；未打开时，可以复制邮箱自行发送。';

    link.addEventListener('click', () => {
        messageVersion += 1;
        // mailto 没有可靠的成功回调，不能声称邮件应用已打开或邮件已发送。
        status.textContent = '若未打开邮件应用，请点击「复制邮箱」，到常用邮箱中写信。';
    });

    copyButton.addEventListener('click', async () => {
        if (pending) return;
        pending = true;
        const version = ++messageVersion;
        copyButton.setAttribute('aria-disabled', 'true');
        status.textContent = '正在复制邮箱…';

        try {
            if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
                throw new Error('Clipboard write is unavailable');
            }
            await navigator.clipboard.writeText(address);
            if (version === messageVersion) {
                status.textContent = '邮箱已复制，可粘贴到邮件的收件人栏。';
            }
        } catch {
            if (version !== messageVersion) return;
            // 权限不足或非安全环境下提供手动途径，不把“选中文字”当成复制成功。
            let selected = false;
            try {
                const selection = window.getSelection();
                if (selection) {
                    const range = document.createRange();
                    range.selectNodeContents(addressText);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    selected = selection.toString() === address;
                }
            } catch {
                // 即使浏览器不允许自动选中，可见邮箱仍可手动选择。
            }
            status.textContent = selected
                ? '未能自动复制，已选中邮箱地址。请使用系统的「复制」操作。'
                : '未能自动复制，请选中上方邮箱地址手动复制。';
        } finally {
            pending = false;
            copyButton.removeAttribute('aria-disabled');
        }
    });
});
