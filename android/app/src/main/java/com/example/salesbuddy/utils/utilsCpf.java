package com.example.salesbuddy.utils;

public class utilsCpf {
    public static android.text.TextWatcher insert(final android.widget.EditText editText) {
        return new android.text.TextWatcher() {
            boolean isUpdating;
            String oldText = "";

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String str = s.toString().replaceAll("[^0-9]", "");
                String mask = "###.###.###-##";
                String textWithMask = "";

                if (isUpdating) {
                    oldText = str;
                    isUpdating = false;
                    return;
                }

                int i = 0;
                for (char m : mask.toCharArray()) {
                    if (m != '#' && str.length() > oldText.length()) {
                        textWithMask += m;
                        continue;
                    }
                    try {
                        textWithMask += str.charAt(i);
                    } catch (Exception e) {
                        break;
                    }
                    i++;
                }

                isUpdating = true;
                editText.setText(textWithMask);
                editText.setSelection(textWithMask.length());
            }

            @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override public void afterTextChanged(android.text.Editable s) {}
        };
    }
}
