export function getDeviceType() {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return "Android";
  } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return "iOS";
  } else {
    return "Unknown";
  }
}
