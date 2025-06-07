import { useEffect, useRef } from 'react';

interface V86Starter {
  new(options: any): any;
}

declare global {
  interface Window {
    V86Starter: V86Starter;
  }
}

export const useV86 = (containerElement: HTMLElement | null) => {
  const emulatorRef = useRef<any>(null);

  useEffect(() => {
    if (!containerElement || emulatorRef.current) return;

    const script = document.createElement('script');
    script.src = '/v86/libv86.js';
    script.async = true;
    
    script.onload = () => {
      const emulator = new window.V86Starter({
        wasm_path: '/v86/v86.wasm',
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        screen_container: containerElement,
        bios: { url: '/v86/seabios.bin' },
        vga_bios: { url: '/v86/vgabios.bin' },
        cdrom: { url: '/v86/alpine-linux.iso' },
        boot_order: 0x132,
        network_relay_url: 'wss://relay.widgetry.org/',
        autostart: true,
        acpi: true,
        disable_speaker: true,
        filesystem: {
          baseurl: '/v86/images/',
          basefs: '/v86/alpine-fs.json'
        }
      });

      emulatorRef.current = emulator;

      emulator.add_listener("emulator-ready", () => {
        console.log("V86 emulator ready");
      });

      emulator.add_listener("error", (error: Error) => {
        console.error("V86 error:", error);
      });
    };

    document.body.appendChild(script);

    return () => {
      if (emulatorRef.current) {
        try {
          emulatorRef.current.destroy();
        } catch (e) {
          console.error("Error destroying V86:", e);
        }
        emulatorRef.current = null;
      }
      document.body.removeChild(script);
    };
  }, [containerElement]);

  return emulatorRef.current;
};